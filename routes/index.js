const express = require('express');
const router = express.Router();

router.use('/ cakes', require('./cakes'))

module.exports = router;