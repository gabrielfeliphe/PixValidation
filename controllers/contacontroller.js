const contaService = require('../services/contaservice');

exports.getAll = async (req, res) => {
    try {
        const contas = await contaService.getAll();
        res.json(contas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const conta = await contaService.create(req.body);
        res.json(conta);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const conta = await contaService.getById(req.params.id);
        if (!conta) {
            res.status(404).json({ error: 'Conta not found' });
        } else {
            res.json(conta);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const conta = await contaService.update(req.params.id, req.body);
        if (!conta) {
            res.status(404).json({ error: 'Conta not found' });
        } else {
            res.json(conta);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const conta = await contaService.remove(req.params.id);
        if (!conta) {
            res.status(404).json({ error: 'Conta not found' });
        } else {
            res.json({ message: 'Conta deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
