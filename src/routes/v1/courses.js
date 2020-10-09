const router = require('express').Router();

const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { CoursesController } = require('../../controllers/CoursesController');

const coursesController = new CoursesController();

router.get('/', isAuthenticated, coursesController.index);
router.get('/:courseId', isAuthenticated, coursesController.show);
router.post('/', isAuthenticated, coursesController.store);
router.put('/:courseId', isAuthenticated, coursesController.update);
router.delete('/:courseId', isAuthenticated, coursesController.destroy);

module.exports = router;
