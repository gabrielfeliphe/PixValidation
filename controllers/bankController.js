const bancoService = require('../services/bankService');

exports.getAll = async (req, res) => {
    try {
        const bancos = await bancoService.getAll();
        res.json(bancos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const banco = await bancoService.create(req.body);
        res.json(banco);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const banco = await bancoService.getById(req.params.id);
        if (!banco) {
            res.status(404).json({ error: 'Banco not found' });
        } else {
            res.json(banco);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const banco = await bancoService.update(req.params.id, req.body);
        if (!banco) {
            res.status(404).json({ error: 'Banco not found' });
        } else {
            res.json(banco);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const banco = await bancoService.remove(req.params.id);
        if (!banco) {
            res.status(404).json({ error: 'Banco not found' });
        } else {
            res.json({ message: 'Banco deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
