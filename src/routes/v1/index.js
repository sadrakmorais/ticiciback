const router = require('express').Router();

const users = require('./users');
const departments = require('./departments');
const courses = require('./courses');
const sectors = require('./sectors');

router.use('/users', users);
router.use('/departments', departments);
router.use('/courses', courses);
router.use('/sectors', sectors);

module.exports = router;
