var express = require('express');
var router = express.Router();
router.use('/question', require('../business/question/route'));
router.use('/answer_sheet', require('../business/answer_sheet/route'));
module.exports = router;
