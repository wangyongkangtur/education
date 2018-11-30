var express = require('express');
var router = express.Router();
router.use('/question', require('../business/question/route'));
router.use('/examination', require('../business/examination/route'));
module.exports = router;
