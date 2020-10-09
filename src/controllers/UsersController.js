const Yup = require('yup');
const User = require('../models/User');
const errors = require('../lib/errors');
const Course = require('../models/Course');

class UsersController {
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

			const users = await User.find(filter).populate({
				path: 'course',
				populate: {
					path: 'department',
					populate: {
						path: 'sector',
					},
				},
			});

			return res.status(200).json({ users });
		} catch (error) {
			console.error(error);

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};

	show = async (req, res) => {
		try {
			const { userId } = req.params;
			const user = await User.findOne({ _id: userId }).populate({
				path: 'course',
				populate: {
					path: 'department',
					populate: {
						path: 'sector',
					},
				},
			});

			if (!user) {
				throw errors.NOT_FOUND('usuário');
			}

			return res.status(200).json({ user });
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
			let user = await User.findOne({ cpf: payload.cpf, course: payload.course });
			const userExists = user ? true : false;

			if (userExists) {
				throw errors.CONFLICT('já existe um usuário com esse CPF nesse curso');
			}

			const courseExists = await Course.findOne({ _id: payload.course });

			if (!courseExists) {
				throw errors.NOT_FOUND('curso');
			}

			const validationSchema = Yup.object().shape({
				course: Yup.mixed().nullable(),
				level: Yup.number().min(0).max(3).required('nível não informado'),
				name: Yup.string().required('não informado'),
				cpf: Yup.string().required('não informado'),
				registration: Yup.string().nullable(),
				isStudent: Yup.boolean().required('não informado'),
				email: Yup.string().required('não informado'),
				password: Yup.string().required('não informado'),
				phone: Yup.string().required('não informado'),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			user = await User.create(payload);

			return res.status(201).json({ user });
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
			const { userId } = req.params;
			const payload = req.body;
			let user = await User.findOne({ _id: userId });

			if (!user) {
				throw errors.NOT_FOUND('usuário');
			}

			const validationSchema = Yup.object().shape({
				course: Yup.mixed().nullable(),
				level: Yup.number().min(0).max(3),
				name: Yup.string(),
				cpf: Yup.string(),
				registration: Yup.string().nullable(),
				isStudent: Yup.boolean(),
				email: Yup.string(),
				password: Yup.string(),
				phone: Yup.string(),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			await User.updateOne({ _id: userId }, { ...payload });

			user = { ...user._doc, ...payload };

			return res.status(201).json({ user });
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
			const { userId } = req.params;
			const user = await User.findOne({ _id: userId });

			if (!user) {
				throw errors.NOT_FOUND('usuário');
			}

			await User.deleteOne({ _id: userId });

			return res.status(200).json({ message: 'usuário excluido' });
		} catch (error) {
			console.error(error);

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};
}

module.exports = { UsersController };
