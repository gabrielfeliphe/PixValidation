const express = require('express');
const router = express.Router();
const { Banco, Conta, PIXKEY , GetAllByQuery} = require('./database');
const validation = require('./validation');

router.get('/pixkey', async (req, res) => {
    try {
    res.json(await GetAllByQuery);
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
        const {chavepix, banco_id, conta_id, tipochave ,validado} = req.body;
        // Verify if conta and banco exist
        const contaExist = await Conta.findOne({ where: { id: conta_id } });
        const bancoExist = await Banco.findOne({ where: { id: banco_id } });
        if (!contaExist || !bancoExist) {
            res.status(404).json({ error: 'Conta or Banco not found' });
        } else {
            // Verify if tipochave is in the allowedTypes
            if(!validation.pix_key_type.allowedTypes.includes(tipochave)) {
                res.status(400).json({ error: 'Invalid tipochave' });
                return;
            }
            // Verify if chavepix matches the pattern of the tipochave
            const pattern = validation.pix_key.when.pix_key_type[tipochave].pattern;
            if(!pattern.test(chavepix)) {
                res.status(400).json({ error: 'Invalid chavepix' });
                return;
            }
            const pixkeyExists = await PIXKEY.findOne({ where: { chavepix } });
            if (pixkeyExists) {
                res.status(400).send({ message: "chave pix já existe" });
                return;
            }
            const pixkey = await PIXKEY.create({chavepix, banco_id, conta_id, tipochave, validado });
            res.send(pixkey);
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

router.post('/banco', async (req, res) => {
    try {
        delete req.body.id;
        const banco = await Banco.create(req.body);
        res.json(banco);
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
        delete req.body.id;
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