const router = require('express').Router();

const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { SubscriptionsController } = require('../../controllers/SubscriptionsController');

const subscriptionsController = new SubscriptionsController();

router.get('/', isAuthenticated, subscriptionsController.index);
router.get('/:subscriptionId', isAuthenticated, subscriptionsController.show);
router.post('/', isAuthenticated, subscriptionsController.store);
router.delete('/:subscriptionId', isAuthenticated, subscriptionsController.destroy);

module.exports = router;
