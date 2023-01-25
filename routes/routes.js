const express = require('express');
const router = express.Router();
const pixkeyController = require('../controllers/pixkeycontroller');
const bancoController = require('../controllers/bancocontroller');
const contaController = require('../controllers/contacontroller');

router.get('/pixkey', pixkeyController.getAllPixkeys);
router.get('/pixkey/:id', pixkeyController.getPixkeyById);
router.post('/pixkey', pixkeyController.createPixkey);
router.put('/pixkey/:id', pixkeyController.updatePixkey);
router.delete('/pixkey/:id', pixkeyController.removePixkey);

router.get('/banco', bancoController.getAll);
router.post('/banco', bancoController.create);
router.get('/banco/:id', bancoController.getById);
router.put('/banco/:id', bancoController.update);
router.delete('/banco/:id', bancoController.remove);

router.get('/conta', contaController.getAll);
router.post('/conta', contaController.create);
router.get('/conta/:id', contaController.getById);
router.put('/conta/:id', contaController.update);
router.delete('/conta/:id', contaController.remove);

module.exports = router;
