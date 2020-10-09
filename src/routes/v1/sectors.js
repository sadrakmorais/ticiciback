const router = require('express').Router();

const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { SectorsController } = require('../../controllers/SectorsController');

const sectorsController = new SectorsController();

router.get('/', isAuthenticated, sectorsController.index);
router.get('/:sectorId', isAuthenticated, sectorsController.show);
router.post('/', isAuthenticated, sectorsController.store);
router.put('/:sectorId', isAuthenticated, sectorsController.update);
router.delete('/:sectorId', isAuthenticated, sectorsController.destroy);

module.exports = router;
