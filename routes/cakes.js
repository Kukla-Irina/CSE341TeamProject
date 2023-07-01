const express = require('express');
const router = express.Router();

const cakesController = require('../controllers/cakes');

router.get('/', cakesController.getAll);

router.get('/:id', cakesController.getSingle);

router.get('/', cakesController.createCake);

router.get('/:id', cakesController.updateCake);

router.delete('/:id', cakesController.deleteCake);

module.exports = router;