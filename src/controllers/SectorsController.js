const Yup = require('yup');
const Sector = require('../models/Sector');
const errors = require('../lib/errors');

class SectorsController {
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

			const sectors = await Sector.find(filter);

			return res.status(200).json({ sectors });
		} catch (error) {
			console.error(error);

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};

	show = async (req, res) => {
		try {
			const { sectorId } = req.params;
			const sector = await Sector.findOne({ _id: sectorId });

			if (!sector) {
				throw errors.NOT_FOUND('setor');
			}

			return res.status(200).json({ sector });
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
			const isNameInUse = await Sector.findOne({ name: payload.name });

			if (isNameInUse) {
				throw errors.CONFLICT('nome em uso');
			}

			const validationSchema = Yup.object().shape({
				name: Yup.string().required('nome não informado'),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			const sector = await Sector.create(payload);

			return res.status(201).json({ sector });
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
			const { sectorId } = req.params;
			const payload = req.body;
			let sector = await Sector.findOne({ _id: sectorId });

			if (!sector) {
				throw errors.NOT_FOUND('setor');
			}

			const isNameInUse = await Sector.findOne({ name: payload.name });

			if (isNameInUse) {
				throw errors.CONFLICT('nome em uso');
			}

			const validationSchema = Yup.object().shape({
				name: Yup.string().required('nome não informado'),
			});

			await validationSchema.validate(payload, { abortEarly: false });
			await Sector.updateOne({ _id: sectorId }, { ...payload });

			sector = { ...sector._doc, ...payload };

			return res.status(201).json({ sector });
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
			const { sectorId } = req.params;
			const sector = await Sector.findOne({ _id: sectorId });

			if (!sector) {
				throw errors.NOT_FOUND('setor');
			}

			await Sector.deleteOne({ _id: sectorId });

			return res.status(200).json({ message: 'faculdade excluida' });
		} catch (error) {
			console.error(error);

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};
}

module.exports = { SectorsController };
