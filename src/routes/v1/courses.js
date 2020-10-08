const router = require('express').Router();

const { CoursesController } = require('../../controllers/CoursesController');

const coursesController = new CoursesController();

router.get('/', (req, res) => coursesController.index(req, res));
router.get('/:courseId', (req, res) => coursesController.show(req, res));
router.post('/', (req, res) => coursesController.store(req, res));
router.put('/:courseId', (req, res) => coursesController.update(req, res));
router.delete('/:courseId', (req, res) => coursesController.destroy(req, res));

module.exports = router;
