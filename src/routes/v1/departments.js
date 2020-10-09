const router = require('express').Router();

const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { DepartmentsController } = require('../../controllers/DepartmentsController');

const departmentsController = new DepartmentsController();

router.get('/', isAuthenticated, departmentsController.index);
router.get('/:departmentId', isAuthenticated, departmentsController.show);
router.post('/', isAuthenticated, departmentsController.store);
router.put('/:departmentId', isAuthenticated, departmentsController.update);
router.delete('/:departmentId', isAuthenticated, departmentsController.destroy);

module.exports = router;
