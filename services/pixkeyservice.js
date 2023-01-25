const { PIXKEY, GetAllByQuery } = require('../models/pixkey');
const { Conta } = require('../models/conta');
const { Banco } = require('../models/banco');
const validation = require('../middlewares/validation');

const getAllByQuery = async () => {
    return await GetAllByQuery
};

const getById = async (id) => {
    const pixkey = await PIXKEY.findByPk(id);
    if (!pixkey) {
        throw { message: "A chave pix não existe", statusCode: 404 };
    }
    const conta = await Conta.findByPk(pixkey.conta_id);
    const banco = await Banco.findByPk(pixkey.banco_id);
    pixkey.dataValues.conta = conta;
    pixkey.dataValues.banco = banco;
    return pixkey;
};

const create = async (data) => {
    const { tipochave } = data;
    const isValidType = validation.pix_key_type.allowedTypes.includes(tipochave);
    if (!isValidType) {
        throw { message: "Tipo de chave é invalida", statusCode: 400 };
    }
    if (!validation.pix_key.when.pix_key_type[tipochave].pattern.test(data.chavepix)) {
        throw { message: `O valor ${data.chavepix} não é válido para o tipo de chave ${data.tipochave}`, statusCode: 400 };
    }
    if (!validation.pix_key.when.pix_key_type['EMAIL'].pattern.test(data.email)) {
        throw { message: "O email não é válido", statusCode: 400 };
    }
    const { banco_id, conta_id } = data;
    const banco = await Banco.findByPk(banco_id);
    const conta = await Conta.findByPk(conta_id);
    if (!banco) {
        throw { message: "Banco não encontrado", statusCode: 404 };
    }
    if (!conta) {
        throw { message: "Conta não encontrada", statusCode: 404 };
    }
    const existingPixKey = await PIXKEY.findOne({ where: { chavepix: data.chavepix } });
    if (existingPixKey) {
        throw { message: "Chave Pix já existente", statusCode: 400 };
    }
    return await PIXKEY.create(data);
};

const update = async (id, data) => {
    const { tipochave } = data;
    const isValidType = validation.pix_key_type.allowedTypes.includes(tipochave);
    if (!isValidType) {
        throw { message: "Tipo de chave é invalida", statusCode: 400 };
    }
    if (!validation.pix_key.when.pix_key_type[tipochave].pattern.test(data.chavepix)) {
        throw { message: `O valor ${data.pix_key} não é válido para o tipo de chave ${data.tipochave}`, statusCode: 400 };
    }
    if (!validation.pix_key.when.pix_key_type['EMAIL'].pattern.test(data.email)) {
        throw { message: "O email não é válido", statusCode: 400 };
    }
    const { banco_id, conta_id } = data;
    const banco = await Banco.findByPk(banco_id);
    const conta = await Conta.findByPk(conta_id);
    if (!banco) {
        throw { message: "Banco não encontrado", statusCode: 404 };
    }
    if (!conta) {
        throw { message: "Conta não encontrada", statusCode: 404 };
    }
    const pixkey = await PIXKEY.findByPk(id);
    if (!pixkey) {
        throw { message: "Chave Pix não foi encontrada", statusCode: 404 };
    }
    return await pixkey.update(data);
};

const remove = async (id) => {
    const pixkey = await PIXKEY.findByPk(id);
    if (!pixkey) {
        throw { message: "Chave pix não encontrada", statusCode: 404 };
    }
    return await pixkey.destroy();
};

module.exports = {
    getAllByQuery,
    getById,
    create,
    update,
    remove
};
