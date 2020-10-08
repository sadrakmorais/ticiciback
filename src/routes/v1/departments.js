const router = require('express').Router();

const { DepartmentsController } = require('../../controllers/DepartmentsController');

const departmentsController = new DepartmentsController();

router.get('/', (req, res) => departmentsController.index(req, res));
router.get('/:departmentId', (req, res) => departmentsController.show(req, res));
router.post('/', (req, res) => departmentsController.store(req, res));
router.put('/:departmentId', (req, res) => departmentsController.update(req, res));
router.delete('/:departmentId', (req, res) => departmentsController.destroy(req, res));

module.exports = router;
