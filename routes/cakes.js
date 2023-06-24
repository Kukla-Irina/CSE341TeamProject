const express = require('express');
const router = express.Router();

const cakesController = require('../controllers/cakes');

router.get('/', cakesController.getAll);

router.get('/:id', cakesController.getSingle);

// router.get('/', cakesController.createCakeItem);

// router.get('/:id', cakesController.updateCakeItem);

// router.delete('/:id', cakesController.deleteCakeItem);

module.exports = router;