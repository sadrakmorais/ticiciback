const router = require('express').Router();

const { UserController } = require('../../controllers/UsersController');

const userController = new UserController();

router.get('/', (req, res) => userController.index(req, res));
router.get('/:userId', (req, res) => userController.show(req, res));
router.post('/', (req, res) => userController.store(req, res));
router.put('/:userId', (req, res) => userController.update(req, res));
router.delete('/:userId', (req, res) => userController.destroy(req, res));

module.exports = router;
