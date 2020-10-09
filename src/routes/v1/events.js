const router = require('express').Router();

const { EventsController } = require('../../controllers/EventsController');

const eventsController = new EventsController();

router.get('/', (req, res) => eventsController.index(req, res));
router.get('/:eventId', (req, res) => eventsController.show(req, res));
router.post('/', (req, res) => eventsController.store(req, res));
router.put('/:eventId', (req, res) => eventsController.update(req, res));
router.delete('/:eventId', (req, res) => eventsController.destroy(req, res));

module.exports = router;
