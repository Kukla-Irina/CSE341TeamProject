const express = require('express');
const router = express.Router();

const sweetsController = require('../controllers/sweets');
const validation = require('../middleware/validate');

router.get('/', sweetsController.getAll);

router.get('/:id', sweetsController.getSingle);

router.post('/', sweetsController.createSweet);

router.put('/:id', sweetsController.updateSweet);

router.delete('/:id', sweetsController.deleteSweet);

module.exports = router;