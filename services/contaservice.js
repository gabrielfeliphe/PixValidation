const { Conta } = require('../models/conta');

const getAll = async () => {
    return await Conta.findAll();
};

const getById = async (id) => {
    return await Conta.findByPk(id);
};

const create = async (data) => {
    return  await Conta.create(data);
}

const update = async (id, data) => {
    const conta = await Conta.findByPk(id);
    return await conta.update(data);
};

const remove = async (id) => {
    const conta = await Conta.findByPk(id);
    return await conta.destroy();
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
