const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));

router.use('/cakes', require('./cakes'));
router.use('/clients', require('./clients'));
router.use('/orders', require('./orders'));
router.use('/sweets', require('./sweets'));

module.exports = router;