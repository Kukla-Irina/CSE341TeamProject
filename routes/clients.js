const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients');

router.get('/', clientsController.getAll);

router.get('/:id', clientsController.getSingle);

// router.get('/', clientsController.createClient);

// router.get('/:id', clientsController.updateClient);

// router.delete('/:id', clientsController.deleteClient);

module.exports = router;