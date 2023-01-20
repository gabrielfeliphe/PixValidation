const express = require('express');
const router = express.Router();
const database = require('./database');

// Create
router.post('/pixkey', (req, res) => {
    database.PIXKEY.create({
        id: req.body.id,
        chavepix: req.body.chavepix,
        banco_id: req.body.banco_id,
        conta_id: req.body.conta_id
    }).then(pixkey => {
        res.status(201).json(pixkey);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Read
router.get('/pixkey/:id', (req, res) => {
    database.PIXKEY.findByPk(req.params.id).then(pixkey => {
        if(pixkey) {
            res.json(pixkey);
        } else {
            res.status(404).json({ message: 'PIXKEY not found' });
        }
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Update
router.put('/pixkey/:id', (req, res) => {
    database.PIXKEY.findByPk(req.params.id).then(pixkey => {
        if(pixkey) {
            pixkey.update({
                chavepix: req.body.chavepix,
                banco_id: req.body.banco_id,
                conta_id: req.body.conta_id
            }).then(() => {
                res.json(pixkey);
            }).catch(err => {
                res.status(500).json(err);
            });
        } else {
            res.status(404).json({ message: 'PIXKEY not found' });
        }
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Delete
router.delete('/pixkey/:id', (req, res) => {
    database.PIXKEY.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.json({ message: 'PIXKEY deleted' });
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;
