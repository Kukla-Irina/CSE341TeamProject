const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menu');

router.get('/', menuController.getAll);

router.get('/:id', menuController.getSingle);

module.exports = router;