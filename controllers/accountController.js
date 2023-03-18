const accountService = require('../services/accountService');


exports.getAll = async (req, res) => {
    try {
        const accounts = await accountService.getAll();
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const accounts = await accountService.create(req.body);
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const accounts = await accountService.getById(req.params.id);
        if (!accounts) {
            res.status(404).json({ error: 'Account not found.' });
        } else {
            res.json(accounts);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const conta = await accountService.update(req.params.id, req.body);
        if (!conta) {
            res.status(404).json({ error: 'Account not found.' });
        } else {
            res.json(conta);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const conta = await accountService.remove(req.params.id);
        res.json({ message: 'Account deleted successfully.' });
    } catch (err) {
        if (err.statusCode) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};
