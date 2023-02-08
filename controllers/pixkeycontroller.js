const { getAllByQuery, getById, create, update, remove } = require('../services/pixkeyService');

const getAllPixkeys = async (req, res) => {
    try {
        const pixkeys = await getAllByQuery();
        res.json(pixkeys);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPixkeyById = async (req, res) => {
    try {
        const pixkey = await getById(req.params.id);
        res.json(pixkey);
    } catch (err) {
        if (err.statusCode) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

const createPixkey = async (req, res) => {
    try {
        const pixkey = await create(req.body);
        res.json(pixkey);
    } catch (err) {
        if (err.statusCode) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

const updatePixkey = async (req, res) => {
    try {
        const pixkey = await update(req.params.id, req.body);
        res.json(pixkey);
    } catch (err) {
        if (err.statusCode) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: err.message });
        }
    }
};

const removePixkey = async (req, res) => {
    try {
        await remove(req.params.id);
        res.json({ message: 'Pixkey removed successfully' });
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err.message });
    }
};

module.exports = {
    getAllPixkeys,
    getPixkeyById,
    createPixkey,
    updatePixkey,
    removePixkey
};