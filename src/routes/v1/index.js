const router = require('express').Router();

const auth = require('./auth');
const users = require('./users');
const departments = require('./departments');
const courses = require('./courses');
const sectors = require('./sectors');
const subscriptions = require('./subscriptions');
const events = require('./events');

router.use('/auth', auth);
router.use('/users', users);
router.use('/departments', departments);
router.use('/courses', courses);
router.use('/sectors', sectors);
router.use('/subscriptions', subscriptions);
router.use('/events', events);

module.exports = router;
