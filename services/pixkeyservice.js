const { PIXKEY, GetAllByQuery } = require('../models/pixkey');
const { Account } = require('../models/account');
const { Bank } = require('../models/bank');
const validation = require('../middlewares/validation');

const getAllByQuery = async () => { // Query foi feita, pois o bank utilizado não aceita FK então as associações tiveram de ser feitas na mão
    return await GetAllByQuery('SELECT DISTINCT PIXKEY.*, CONTA.nome as TITULAR, CONTA.cpf_cnpj AS DOCUMENTO, BANCO.nome as NOME_BANCO, BANCO.agencia, BANCO.CC FROM PIXKEY INNER JOIN CONTA ON PIXKEY.conta_id = CONTA.id INNER JOIN BANCO ON PIXKEY.banco_id = BANCO.id')
};

const getById = async (id) => {
    const pixkey = await PIXKEY.findByPk(id);
    if (!pixkey) {
        throw { message: "Pix key does not exist", statusCode: 404 };
    }
    const account = await Account.findByPk(pixkey.account_id);
    const bank = await Bank.findByPk(pixkey.bank_id);
    pixkey.dataValues.account = account;
    pixkey.dataValues.bank = bank;
    return pixkey;
};

const create = async (data) => {
    const { tipochave } = data;
    const isValidType = validation.pix_key_type.allowedTypes.includes(tipochave);
    if (!isValidType) {
        throw { message: "Key type is invalid", statusCode: 400 };
    }
    if (!validation.pix_key.when.pix_key_type[tipochave].pattern.test(data.chavepix)) {
        throw { message: `The value ${data.chavepix} not is valid for ${data.tipochave}`, statusCode: 400 };
    }
    if (!validation.pix_key.when.pix_key_type['EMAIL'].pattern.test(data.email)) {
        throw { message: "The email is not valid", statusCode: 400 };
    }
    const { bank_id, account_id } = data;
    const bank = await Bank.findByPk(bank_id);
    const account = await Account.findByPk(account_id);
    if (!bank) {
        throw { message: "Bank not found", statusCode: 404 };
    }
    if (!account) {
        throw { message: "Account not found", statusCode: 404 };
    }
    const existingPixKey = await PIXKEY.findOne({ where: { chavepix: data.chavepix } });
    if (existingPixKey) {
        throw { message: "Existing Pix Key", statusCode: 400 };
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
    const { bank_id, account_id } = data;
    const bank = await Bank.findByPk(bank_id);
    const account = await Account.findByPk(account_id);
    if (!bank) {
        throw { message: "bank não encontrado", statusCode: 404 };
    }
    if (!account) {
        throw { message: "account não encontrada", statusCode: 404 };
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
