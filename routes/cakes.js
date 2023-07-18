const express = require('express');
const router = express.Router();

const cakesController = require('../controllers/cakes');
const validation = require('../middleware/validate');

router.get('/', cakesController.getAll);

router.get('/:id', cakesController.getSingle);

router.post('/', cakesController.createCake);

router.put('/:id', cakesController.updateCake);

router.delete('/:id', cakesController.deleteCake);

module.exports = router;