const Yup = require('yup');
const Department = require('../models/Department');
const errors = require('../lib/errors');

class DepartmentsController {
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

			const departments = await Department.find(filter).populate('sector');

			return res.status(200).json({ departments });
		} catch (error) {
			console.error(error);

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};

	show = async (req, res) => {
		try {
			const { departmentId } = req.params;
			const department = await Department.findOne({ _id: departmentId }).populate('sector');

			if (!department) {
				throw errors.NOT_FOUND('departamento');
			}

			return res.status(200).json({ department });
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
			const isNameInUse = await Department.findOne({ name: payload.name });

			if (isNameInUse) {
				throw errors.CONFLICT('nome em uso');
			}

			const validationSchema = Yup.object().shape({
				sector: Yup.mixed().required('faculdade não informada'),
				name: Yup.string().required('nome não informado'),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			const department = await Department.create(payload);

			return res.status(201).json({ department });
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
			const { departmentId } = req.params;
			const payload = req.body;
			let department = await Department.findOne({ _id: departmentId });

			if (!department) {
				throw errors.NOT_FOUND('departamento');
			}

			const isNameInUse = await Department.findOne({ name: payload.name });

			if (isNameInUse) {
				throw errors.CONFLICT('nome em uso');
			}

			const validationSchema = Yup.object().shape({
				department: Yup.mixed(),
				name: Yup.string(),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			await Department.updateOne({ _id: departmentId }, { ...payload });

			department = { ...department._doc, ...payload };

			return res.status(201).json({ department });
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
			const { departmentId } = req.params;
			const department = await Department.findOne({ _id: departmentId });

			if (!department) {
				throw errors.NOT_FOUND('departamento');
			}

			await Department.deleteOne({ _id: departmentId });

			return res.status(200).json({ message: 'departamento excluído' });
		} catch (error) {
			console.error(error);

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};
}

module.exports = { DepartmentsController };
