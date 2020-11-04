const Yup = require('yup');

const User = require('../models/User');
const Course = require('../models/Course');

const errors = require('../lib/errors');
const bcrypt = require('bcrypt');

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
			let payload = req.body;
			let user = await User.findOne({ cpf: payload.cpf, course: payload.course });
			const userExists = user ? true : false;

			if (userExists) {
				throw errors.CONFLICT('já existe um usuário com esse CPF nesse curso');
			}

			if (payload.course) {
				const courseExists = await Course.findOne({ _id: payload.course });

				if (!courseExists) {
					throw errors.NOT_FOUND('curso');
				}
			}

			const validationSchema = Yup.object().shape({
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

			let { password } = payload;
			const salt = await bcrypt.genSalt(10);

			password = await bcrypt.hash(password, salt);
			user = await User.create({ ...payload, password });

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
			const { password, ...payload } = req.body;
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
