const { Bank } = require('../models/bank');

const getAll = async () => {
    return await Bank.findAll();
};

const getById = async (id) => {
    return await Bank.findByPk(id);
};

const create = async (data) => {
    return  await Bank.create(data);
}

const update = async (id, data) => {
    const bank = await Bank.findByPk(id);
    return await bank.update(data);
};

const remove = async (id) => {
    const bank = await Bank.findByPk(id);
    return await bank.destroy();
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
