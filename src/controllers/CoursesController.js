const Yup = require('yup');
const Course = require('../models/Course');
const errors = require('../lib/errors');

class CoursesController {
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

			const courses = await Course.find(filter);

			return res.status(200).json({ courses });
		} catch (error) {
			console.error(error);

			return res.status(erro.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};

	show = async (req, res) => {
		try {
			const { courseId } = req.params;
			const course = await Course.findOne({ _id: courseId });

			if (!course) {
				throw errors.NOT_FOUND;
			}

			return res.status(200).json({ course });
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
				department: Yup.mixed().required('departamento não informado'),
				name: Yup.string().required('nome não informado'),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			const course = await Course.create(payload);

			return res.status(201).json({ course });
		} catch (error) {
			console.error(error);

			if (error instanceof Yup.ValidationError) {
				return res.status(errors.BAD_REQUEST).json({ error: error.inner });
			}

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};

	update = async (req, res) => {
		try {
			const { courseId } = req.params;
			const payload = req.body;
			let course = await Course.findOne({ _id: courseId });

			if (!course) {
				throw errors.NOT_FOUND;
			}

			const validationSchema = Yup.object().shape({
				department: Yup.mixed(),
				name: Yup.string(),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			await Course.updateOne({ _id: courseId }, { ...payload });

			course = { ...course, ...payload };

			return res.status(201).json({ course });
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
			const { courseId } = req.params;
			const course = await Course.findOne({ _id: courseId });

			if (!course) {
				throw errors.NOT_FOUND;
			}

			await Course.deleteOne({ _id: courseId });

			return res.status(200).json({ message: 'usuário excluido' });
		} catch (error) {
			console.error(error);

			return res.status(erro.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};
}

module.exports = { CoursesController };
