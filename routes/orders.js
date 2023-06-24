const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders');

router.get('/', ordersController.getAll);

router.get('/:id', ordersController.getSingle);

// router.get('/', ordersController.createCakeItem);

// router.get('/:id', ordersController.updateCakeItem);

// router.delete('/:id', ordersController.deleteCakeItem);

module.exports = router;