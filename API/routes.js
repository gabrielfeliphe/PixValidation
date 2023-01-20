const express = require('express');
const router = express.Router();
const { Banco, Conta, PIXKEY } = require('./database');

router.get('/pixkey', async (req, res) => {
    try {
        const pixkeys = await PIXKEY.findAll();
        res.json(pixkeys);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/pixkey/:id', async (req, res) => {
    try {
        const pixkey = await PIXKEY.findOne({ where: { id: req.params.id } });
        if (!pixkey) {
            res.status(404).json({ error: 'Pixkey not found' });
        } else {
            res.json(pixkey);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/pixkey', async (req, res) => {
    try {
        // Verify if conta and banco exist
        const contaExist = await Conta.findOne({ where: { id: req.body.conta_id } });
        const bancoExist = await Banco.findOne({ where: { id: req.body.banco_id } });
        if (!contaExist || !bancoExist) {
            res.status(404).json({ error: 'Conta or Banco not found' });
        } else {
            const pixkey = await PIXKEY.create(req.body);
            res.json(pixkey);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/pixkey/:id', async (req, res) => {
    try {
        // Verify if conta and banco exist
        const contaExist = await Conta.findOne({ where: { id: req.body.conta_id } });
        const bancoExist = await Banco.findOne({ where: { id: req.body.banco_id } });
        if (!contaExist || !bancoExist) {
            res.status(404).json({ error: 'Conta or Banco not found' });
        } else {
            const pixkey = await PIXKEY.findOne({ where: { id: req.params.id } });
            if (!pixkey) {
                res.status(404).json({ error: 'Pixkey not found' });
            } else {
                await pixkey.update(req.body);
                res.json(pixkey);
            }
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/pixkey/:id', async (req, res) => {
    try {
        const pixkey = await PIXKEY.findOne({ where: { id: req.params.id } });
        if (!pixkey) {
            res.status(404).json({ error: 'Pixkey not found' });
        } else {
            await pixkey.destroy();
            res.json({ message: 'Pixkey deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/banco', async (req, res) => {
    try {
        const bancos = await Banco.findAll();
        res.json(bancos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/banco/:id', async (req, res) => {
    try {
        const banco = await Banco.findOne({ where: { id: req.params.id } });
        if (!banco) {
            res.status(404).json({ error: 'Banco not found' });
        } else {
            res.json(banco);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/banco/:id', async (req, res) => {
    try {
        const banco = await Banco.findOne({ where: { id: req.params.id } });
        if (!banco) {
            res.status(404).json({ error: 'Banco not found' });
        } else {
            await banco.update(req.body);
            res.json(banco);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/banco/:id', async (req, res) => {
    try {
        const banco = await Banco.findOne({ where: { id: req.params.id } });
        if (!banco) {
            res.status(404).json({ error: 'Banco not found' });
        } else {
            await banco.destroy();
            res.json({ message: 'Banco deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/conta', async (req, res) => {
    try {
        const contas = await Conta.findAll();
        res.json(contas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/conta/:id', async (req, res) => {
    try {
        const conta = await Conta.findOne({ where: { id: req.params.id } });
        if (!conta) {
            res.status(404).json({ error: 'Conta not found' });
        } else {
            res.json(conta);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/conta', async (req, res) => {
    try {
        const conta = await Conta.create(req.body);
        res.json(conta);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/conta/:id', async (req, res) => {
    try {
        const conta = await Conta.findOne({ where: { id: req.params.id } });
        if (!conta) {
            res.status(404).json({ error: 'Conta not found' });
        } else {
            await conta.update(req.body);
            res.json(conta);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/conta/:id', async (req, res) => {
    try {
        const conta = await Conta.findOne({ where: { id: req.params.id } });
        if (!conta) {
            res.status(404).json({ error: 'Conta not found' });
        } else {
            await conta.destroy();
            res.json({ message: 'Conta deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;