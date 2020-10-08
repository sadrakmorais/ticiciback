const Yup = require('yup');
const User = require('../models/User');
const errors = require('../lib/errors');

class UserController {
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

			const users = await User.find(filter).select('-password');

			return res.status(200).json({ users });
		} catch (error) {
			console.error(error);

			return res.status(erro.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};

	show = async (req, res) => {
		try {
			const { userId } = req.params;
			const user = await User.findOne({ _id: userId });

			if (!user) {
				throw errors.NOT_FOUND;
			}

			return res.status(200).json({ user });
		} catch (error) {
			console.error(error);

			return res.status(erro.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};

	store = async (req, res) => {
		try {
			const payload = req.body;
			const validationSchema = Yup.object().shape({
				course: Yup.mixed().required('curso não informado'),
				level: Yup.number().min(0).max(3).required('nível não informado'),
				name: Yup.string().required('não informado'),
				cpf: Yup.string().required('não informado'),
				registration: Yup.string().required('não informado'),
				isStudent: Yup.boolean().required('não informado'),
				email: Yup.string().required('não informado'),
				password: Yup.string().required('não informado'),
				phone: Yup.string().required('não informado'),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			const user = await User.create(payload);

			return res.status(201).json({ user });
		} catch (error) {
			console.error(error);

			if (error instanceof Yup.ValidationError) {
				return res.status(errors.BAD_REQUEST).json({ error: error.inner });
			}

			return res.status(erro.code || 500).json({
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
				throw errors.NOT_FOUND;
			}

			const validationSchema = Yup.object().shape({
				course: Yup.mixed().required('curso não informado'),
				level: Yup.number().min(0).max(3).required('nível não informado'),
				name: Yup.string().required('não informado'),
				cpf: Yup.string().required('não informado'),
				registration: Yup.string().required('não informado'),
				isStudent: Yup.boolean().required('não informado'),
				email: Yup.string().required('não informado'),
				password: Yup.string().required('não informado'),
				phone: Yup.string().required('não informado'),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			await User.updateOne({ _id: userId }, { ...payload });

			user = { ...user, ...payload };

			return res.status(201).json({ user });
		} catch (error) {
			console.error(error);

			if (error instanceof Yup.ValidationError) {
				return res.status(errors.BAD_REQUEST).json({ error: error.inner });
			}

			return res.status(erro.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};

	destroy = async (req, res) => {
		try {
			const { userId } = req.params;
			const user = await User.findOne({ _id: userId });

			if (!user) {
				throw errors.NOT_FOUND;
			}

			await User.deleteOne({ _id: userId });

			return res.status(200).json({ message: 'usuário excluido' });
		} catch (error) {
			console.error(error);

			return res.status(erro.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};
}

module.exports = { UserController };
