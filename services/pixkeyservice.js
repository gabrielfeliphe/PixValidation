const { PIXKEY, GetAllByQuery } = require('../models/pixkey');
const { Conta } = require('../models/conta');
const { Banco } = require('../models/banco');

const getAllByQuery = async () => {
    return await GetAllByQuery
};

const getById = async (id) => {
    const pixkey = await PIXKEY.findByPk(id);
    const conta = await Conta.findByPk(pixkey.conta_id);
    const banco = await Banco.findByPk(pixkey.banco_id);
    pixkey.dataValues.conta = conta;
    pixkey.dataValues.banco = banco;
    return pixkey;
};

const create = async (data) => {
    const { banco_id, conta_id } = data;
    console.log(banco_id)
    const banco = await Banco.findByPk(banco_id);
    const conta = await Conta.findByPk(conta_id);
    if (!banco) {
        throw new Error("Banco não encontrado");
    }
    if (!conta) {
        throw new Error("Conta não encontrada");
    }
    return await PIXKEY.create(data);
};

const update = async (id, data) => {
    const { banco_id, conta_id } = data;
    console.log(banco_id)
    const banco = await Banco.findByPk(banco_id);
    const conta = await Conta.findByPk(conta_id);
    if (!banco) {
        throw new Error("Banco não encontrado");
    }
    if (!conta) {
        throw new Error("Conta não encontrada");
    }
    const pixkey = await PIXKEY.findByPk(id);
    return await pixkey.update(data);
};

const remove = async (id) => {
    const pixkey = await PIXKEY.findByPk(id);
    return await pixkey.destroy();
};

module.exports = {
    getAllByQuery,
    getById,
    create,
    update,
    remove
};
