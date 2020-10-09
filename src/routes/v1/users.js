const router = require('express').Router();

const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { UsersController } = require('../../controllers/UsersController');

const usersController = new UsersController();

router.get('/', isAuthenticated, usersController.index);
router.get('/:userId', isAuthenticated, usersController.show);
router.post('/', usersController.store);
router.put('/:userId', isAuthenticated, usersController.update);
router.delete('/:userId', isAuthenticated, usersController.destroy);

module.exports = router;
