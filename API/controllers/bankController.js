const bankService = require('../services/bankService');


exports.getAll = async (req, res) => {
    try {
        const banks = await bankService.getAll();
        res.json(banks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const bank = await bankService.create(req.body);
        res.json(bank);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const bank = await bankService.getById(req.params.id);
        if (!bank) {
            res.status(404).json({ error: 'Bank not found.' });
        } else {
            res.json(bank);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const bank = await bankService.update(req.params.id, req.body);
        if (!bank) {
            res.status(404).json({ error: 'Bank not found.' });
        } else {
            res.json(bank);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const bank = await bankService.remove(req.params.id);
        if (!bank) {
            res.status(404).json({ error: 'Bank not found.' });
        } else {
            res.json({ message: 'Bank deleted successfully.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
