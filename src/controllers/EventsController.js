const Yup = require('yup');
const isWithinInterval = require('date-fns/isWithinInterval');

const Event = require('../models/Event');
const errors = require('../lib/errors');

class EventsController {
	index = async (req, res) => {
		try {
			const query = req.query;
			let filter = {};

			if (Object.keys(query).length) {
				for (const key in query) {
					if (query.hasOwnProperty(key)) {
						filter[key] = query[key];
					}
				}
			}

			const events = await Event.find(filter).populate({
				path: 'department',
				populate: { path: 'sector' },
			});

			return res.status(200).json({ events });
		} catch (error) {
			console.error(error);

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};

	show = async (req, res) => {
		try {
			const { eventId } = req.params;
			const event = await Event.findOne({ _id: eventId }).populate({
				path: 'department',
				populate: { path: 'sector' },
			});

			if (!event) {
				throw errors.NOT_FOUND('evento');
			}

			return res.status(200).json({ event });
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
			const validationSchema = Yup.object().shape({
				department: Yup.string().required('departamento não informado'),
				name: Yup.string().required('nome não informado'),
				period: Yup.object().shape({
					start: Yup.mixed().required('data de início não informada'),
					end: Yup.mixed().required('data de fim não informada'),
				}),
				description: Yup.string().required('descrição não informada'),
				vacancies: Yup.number().min(0),
				location: Yup.string().required('local não informado'),
                observations: Yup.string().nullable(),
                photo: Yup.string().nullable(),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			const event = await Event.create({ ...payload, isFinished: false, isAccepted: false });

			return res.status(201).json({ event });
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

	update = async (req, res) => {
		try {
			const { eventId } = req.params;
			const payload = req.body;
			let event = await Event.findOne({ _id: eventId });

			if (!event) {
				throw errors.NOT_FOUND('evento');
			}

			const validationSchema = Yup.object().shape({
				name: Yup.string().required('nome não informado'),
				period: Yup.object().shape({
					start: Yup.mixed().required('data de início não informada'),
					end: Yup.mixed().required('data de fim não informada'),
				}),
				description: Yup.string().required('descrição não informada'),
				vacancies: Yup.number().min(0),
				location: Yup.string().required('local não informado'),
                observations: Yup.string().nullable(),
                photo: Yup.string().nullable(),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			await Event.updateOne({ _id: eventId }, { ...payload });

			event = { ...event._doc, ...payload };

			return res.status(201).json({ event });
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

	modify = async (req, res) => {
		try {
			const { eventId } = req.params;
			const payload = req.body;
			let event = await Event.findOne({ _id: eventId });

			if (!event) {
				throw errors.NOT_FOUND('evento');
			}

			const validationSchema = Yup.object().shape({
				isFinished: Yup.boolean().nullable(),
				isAccepted: Yup.boolean().nullable(),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			await Event.updateOne({ _id: eventId }, { ...payload });

			event = { ...event._doc, ...payload };

			return res.status(201).json({ event });
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
			const { eventId } = req.params;
			const event = await Event.findOne({ _id: eventId });

			if (!event) {
				throw errors.NOT_FOUND('evento');
			}

			const today = new Date();
			const isEventOccurring = isWithinInterval(today, {
				start: event.period.start,
				end: event.period.end,
			});

			if (isEventOccurring) {
				throw errors.BAD_REQUEST(
					'o evento não pode ser excluído pois o mesmo está em andamento'
				);
			}

			await Event.deleteOne({ _id: eventId });

			return res.status(200).json({ message: 'evento excluído' });
		} catch (error) {
			console.error(error);

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};
}

module.exports = { EventsController };
