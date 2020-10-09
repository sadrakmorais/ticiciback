const router = require('express').Router();

const { SubscriptionsController } = require('../../controllers/SubscriptionsController');

const subscriptionsController = new SubscriptionsController();

router.get('/', (req, res) => subscriptionsController.index(req, res));
router.get('/:subscriptionId', (req, res) => subscriptionsController.show(req, res));
router.post('/', (req, res) => subscriptionsController.store(req, res));
router.delete('/:subscriptionId', (req, res) => subscriptionsController.destroy(req, res));

module.exports = router;
