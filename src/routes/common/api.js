var express = require('express');
var router = express.Router();
router.use('/user', require('../business/user/route'));
router.use('/paper', require('../business/paper/route'));
router.use('/question', require('../business/question/route'));
router.use('/answer_sheet', require('../business/answer_sheet/route'));
module.exports = router;
