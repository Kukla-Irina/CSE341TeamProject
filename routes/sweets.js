const express = require('express');
const router = express.Router();

const sweetsController = require('../controllers/sweets');
const validation = require('../middleware/validate');

router.get('/', sweetsController.getAll);

router.get('/:id', sweetsController.getSingle);

router.post('/', validation.saveSweet.sweetsController.createSweet);

router.put('/:id', validation.saveSweet.sweetsController.updateSweet);

router.delete('/:id', sweetsController.deleteSweet);

module.exports = router;