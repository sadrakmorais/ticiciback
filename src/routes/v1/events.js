const router = require('express').Router();

const { isAuthenticated } = require('../../middlewares/isAuthenticated');
const { EventsController } = require('../../controllers/EventsController');

const eventsController = new EventsController();

router.get('/', isAuthenticated, eventsController.index);
router.get('/:eventId', isAuthenticated, eventsController.show);
router.post('/', isAuthenticated, eventsController.store);
router.put('/:eventId', isAuthenticated, eventsController.update);
router.patch('/:eventId', isAuthenticated, eventsController.modify);
router.delete('/:eventId', isAuthenticated, eventsController.destroy);

module.exports = router;
