const express = require('express');
const router = express.Router();

const sweetsController = require('../controllers/sweets');

router.get('/', sweetsController.getAll);

router.get('/:id', sweetsController.getSingle);

// router.get('/', sweetsController.createCakeItem);

// router.get('/:id', sweetsController.updateCakeItem);

// router.delete('/:id', sweetsController.deleteCakeItem);

module.exports = router;