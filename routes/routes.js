const express = require('express');
const router = express.Router();
const pixkeyController = require('../controllers/pixkeyController');
const bankController = require('../controllers/bankController');
const accountController = require('../controllers/accountController');

router.get('/pixkey', pixkeyController.getAllPixkeys);
router.get('/pixkey/:id', pixkeyController.getPixkeyById);
router.post('/pixkey', pixkeyController.createPixkey);
router.put('/pixkey/:id', pixkeyController.updatePixkey);
router.delete('/pixkey/:id', pixkeyController.removePixkey);

router.get('/bank', bankController.getAll);
router.post('/bank', bankController.create);
router.get('/bank/:id', bankController.getById);
router.put('/bank/:id', bankController.update);
router.delete('/bank/:id', bankController.remove);

router.get('/account', accountController.getAll);
router.post('/account', accountController.create);
router.get('/account/:id', accountController.getById);
router.put('/account/:id', accountController.update);
router.delete('/account/:id', accountController.remove);

module.exports = router;
