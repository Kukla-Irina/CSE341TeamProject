const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients');
const validation = require('../middleware/validate');

router.get('/', clientsController.getAll);

router.get('/:id', clientsController.getSingle);

//router.get('/:lastName', clientsController.getByName);

router.post('/', validation.saveClient.clientsController.createClient);

router.put('/:id', validation.saveClient.clientsController.updateClient);

router.delete('/:id', clientsController.deleteClient);

module.exports = router;