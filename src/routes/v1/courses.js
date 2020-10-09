const router = require('express').Router();

const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { CoursesController } = require('../../controllers/CoursesController');

const coursesController = new CoursesController();

router.get('/', isAuthenticated, (req, res) => coursesController.index(req, res));
router.get('/:courseId', isAuthenticated, (req, res) => coursesController.show(req, res));
router.post('/', isAuthenticated, (req, res) => coursesController.store(req, res));
router.put('/:courseId', isAuthenticated, (req, res) => coursesController.update(req, res));
router.delete('/:courseId', isAuthenticated, (req, res) => coursesController.destroy(req, res));

module.exports = router;
