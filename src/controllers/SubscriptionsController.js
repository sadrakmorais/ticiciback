const Yup = require('yup');

const Subscription = require('../models/Subscription');
const Event = require('../models/Event');
const User = require('../models/User');

const isAfter = require('date-fns/isAfter');
const errors = require('../lib/errors');

class SubscriptionsController {
	index = async (req, res) => {
		try {
			const { event } = req.headers;
			const query = req.query;
			const filter = {};

			if (event) {
				filter['event'] = event;
			}

			if (Object.keys(query).length) {
				for (const key in query) {
					if (query.hasOwnProperty(key)) {
						filter[key] = query[key];
					}
				}
			}

			const subscriptions = await Subscription.find(filter).populate('user event');

			return res.status(200).json({ subscriptions });
		} catch (error) {
			console.error(error);

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};

	show = async (req, res) => {
		try {
			const { subscriptionId } = req.params;
			const subscription = await Subscription.findOne({ _id: subscriptionId }).populate({
				path: 'user event',
				populate: {
					path: 'course',
					populate: {
						path: 'department',
						populate: {
							path: 'sector',
						},
					},
				},
			});

			if (!subscription) {
				throw errors.NOT_FOUND('inscrição');
			}

			return res.status(200).json({ subscription });
		} catch (error) {
			console.error(error);

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};

	store = async (req, res) => {
		try {
			const payload = req.body;
			let { user, event } = payload;
			const registered = await Subscription.findOne({ user, event });

			if (registered) {
				throw errors.CONFLICT('usuário já inscrito nesse evento');
			}

			const validationSchema = Yup.object().shape({
				user: Yup.mixed().required('usuário não informado'),
				event: Yup.mixed().required('evento não informado'),
			});

			const [userExists, eventExists] = await Promise.all([
				User.findOne({ _id: user }),
				Event.findOne({ _id: event, isFinished: false }),
			]);

			if (!userExists || !eventExists) {
				throw errors.NOT_FOUND(
					`${userExists ? '' : 'usuário'}, ${eventExists ? '' : 'evento'}`
				);
			}

			const today = new Date();

			if (isAfter(today, eventExists.period.start)) {
				throw errors.BAD_REQUEST('evento já iniciado');
			}

			await validationSchema.validate(payload, { abortEarly: false });
			const subscription = await Subscription.create(payload);

			return res.status(201).json({ subscription });
		} catch (error) {
			console.error(error);

			if (error instanceof Yup.ValidationError) {
				return res.status(errors.BAD_REQUEST().code).json({ error: error.inner });
			}

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};

	destroy = async (req, res) => {
		try {
			const { subscriptionId } = req.params;
			const subscription = await Subscription.findOne({ _id: subscriptionId });

			if (!subscription) {
				throw errors.NOT_FOUND('inscrição');
			}

			const today = new Date();
			const event = await Event.findOne({ _id: subscription.event });

			if (isAfter(today, event.period.start)) {
				throw errors.BAD_REQUEST(
					'não é possível excluir essa inscrição pois o evento já foi iniciado'
				);
			}

			await Subscription.deleteOne({ _id: subscriptionId });

			return res.status(200).json({ message: 'inscrição excluído' });
		} catch (error) {
			console.error(error);

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};
}

module.exports = { SubscriptionsController };
