const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const logsController = require('../controllers/logsController')

router.get('/', contactController.getContacts);

router.get('/:id',contactController.getContactById)

router.post('/', contactController.addContact);

router.post('/logs', logsController.receiveLogs);

router.put('/:id', contactController.updateContact);

router.delete('/:id', contactController.deleteContact);

module.exports = router;
