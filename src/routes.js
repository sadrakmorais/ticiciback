const router = require('express').Router();

const v1 = require('./routes/v1');

router.use('/v1', v1);

module.exports = router;
