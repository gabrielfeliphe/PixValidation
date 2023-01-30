const { Banco } = require('../models/bank');

const getAll = async () => {
    return await Banco.findAll();
};

const getById = async (id) => {
    return await Banco.findByPk(id);
};

const create = async (data) => {
    return  await Banco.create(data);
}

const update = async (id, data) => {
    const banco = await Banco.findByPk(id);
    return await banco.update(data);
};

const remove = async (id) => {
    const banco = await Banco.findByPk(id);
    return await banco.destroy();
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
