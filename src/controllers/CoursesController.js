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

			const courses = await Course.find(filter).populate({
				path: 'department',
				populate: { path: 'sector' },
			});

			return res.status(200).json({ courses });
		} catch (error) {
			console.error(error);

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};

	show = async (req, res) => {
		try {
			const { courseId } = req.params;
			const course = await Course.findOne({ _id: courseId }).populate({
				path: 'department',
				populate: { path: 'sector' },
			});

			if (!course) {
				throw errors.NOT_FOUND('curso');
			}

			return res.status(200).json({ course });
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
			const isNameInUse = await Course.findOne({ name: payload.name });

			if (isNameInUse) {
				throw errors.CONFLICT('nome em uso');
			}

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
				return res.status(errors.BAD_REQUEST().code).json({ error: error.inner });
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
				throw errors.NOT_FOUND('curso');
			}

			const isNameInUse = await Course.findOne({ name: payload.name });

			if (isNameInUse) {
				throw errors.CONFLICT('nome em uso');
			}

			const validationSchema = Yup.object().shape({
				department: Yup.mixed(),
				name: Yup.string(),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			await Course.updateOne({ _id: courseId }, { ...payload });

			course = { ...course._doc, ...payload };

			return res.status(201).json({ course });
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
			const { courseId } = req.params;
			const course = await Course.findOne({ _id: courseId });

			if (!course) {
				throw errors.NOT_FOUND('curso');
			}

			await Course.deleteOne({ _id: courseId });

			return res.status(200).json({ message: 'curso excluído' });
		} catch (error) {
			console.error(error);

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};
}

module.exports = { CoursesController };
