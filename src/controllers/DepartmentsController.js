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

			const departments = await Department.find(filter);

			return res.status(200).json({ departments });
		} catch (error) {
			console.error(error);

			return res.status(erro.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};

	show = async (req, res) => {
		try {
			const { departmentId } = req.params;
			const department = await Department.findOne({ _id: departmentId });

			if (!department) {
				throw errors.NOT_FOUND;
			}

			return res.status(200).json({ department });
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
				sector: Yup.mixed().required('faculdade não informada'),
				name: Yup.number().min(0).max(3).required('nome não informado'),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			const department = await Department.create(payload);

			return res.status(201).json({ department });
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
			const { departmentId } = req.params;
			const payload = req.body;
			let department = await Department.findOne({ _id: departmentId });

			if (!department) {
				throw errors.NOT_FOUND;
			}

			const validationSchema = Yup.object().shape({
				department: Yup.mixed(),
				name: Yup.string(),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			await Department.updateOne({ _id: departmentId }, { ...payload });

			department = { ...department, ...payload };

			return res.status(201).json({ department });
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
			const { departmentId } = req.params;
			const department = await Department.findOne({ _id: departmentId });

			if (!department) {
				throw errors.NOT_FOUND;
			}

			await Department.deleteOne({ _id: departmentId });

			return res.status(200).json({ message: 'usuário excluido' });
		} catch (error) {
			console.error(error);

			return res.status(erro.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};
}

module.exports = { DepartmentsController };
