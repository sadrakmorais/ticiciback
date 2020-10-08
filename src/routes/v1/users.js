const router = require('express').Router();

const { UsersController } = require('../../controllers/UsersController');

const usersController = new UsersController();

router.get('/', (req, res) => usersController.index(req, res));
router.get('/:userId', (req, res) => usersController.show(req, res));
router.post('/', (req, res) => usersController.store(req, res));
router.put('/:userId', (req, res) => usersController.update(req, res));
router.delete('/:userId', (req, res) => usersController.destroy(req, res));

module.exports = router;
