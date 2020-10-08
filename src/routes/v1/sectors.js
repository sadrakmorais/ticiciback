const router = require('express').Router();

const { SectorsController } = require('../../controllers/SectorsController');

const sectorsController = new SectorsController();

router.get('/', (req, res) => sectorsController.index(req, res));
router.get('/:sectorId', (req, res) => sectorsController.show(req, res));
router.post('/', (req, res) => sectorsController.store(req, res));
router.put('/:sectorId', (req, res) => sectorsController.update(req, res));
router.delete('/:sectorId', (req, res) => sectorsController.destroy(req, res));

module.exports = router;
