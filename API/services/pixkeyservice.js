const { PIXKEY, GetAllByQuery } = require('../models/pixkey');

const { Account } = require('../models/account');
const { Bank } = require('../models/bank');

const validation = require('../middlewares/validation');

const getAllByQuery = async () => { // Query foi feita, pois o bank utilizado não aceita FK então as associações tiveram de ser feitas na mão
    return await GetAllByQuery('SELECT DISTINCT PIXKEY.*, ACCOUNT.name as ACCOUNT_HOLDER, ACCOUNT.federalDocument AS FederalDocument, BANK.name as BANK_NAME, BANK.agency, BANK.accountNumber FROM PIXKEY INNER JOIN ACCOUNT ON PIXKEY.account_id = ACCOUNT.id INNER JOIN BANK ON PIXKEY.bank_id = BANK.id')
};

const getById = async (id) => {
    const pixkey = await PIXKEY.findByPk(id);
    if (!pixkey) {
        throw { message: "Pix key does not exist.", statusCode: 404 };
    }
    const account = await Account.findByPk(pixkey.account_id);
    const bank = await Bank.findByPk(pixkey.bank_id);
    pixkey.dataValues.account = account;
    pixkey.dataValues.bank = bank;
    return pixkey;
};

const create = async (data) => {
    const { typeOfKey } = data;
    const isValidType = validation.pix_key_type.allowedTypes.includes(typeOfKey);
    if (!isValidType) {
        throw { message: "Key type is invalid.", statusCode: 400 };
    }
    if (!validation.pix_key.when.pix_key_type[typeOfKey].pattern.test(data.pixKey)) {
        throw { message: `The value ${data.pixKey} not is valid for ${data.typeOfKey}.`, statusCode: 400 };
    }
    if (!validation.pix_key.when.pix_key_type['EMAIL'].pattern.test(data.email)) {
        throw { message: "The email is not valid.", statusCode: 400 };
    }
    const { bank_id, account_id } = data;
    const bank = await Bank.findByPk(bank_id);
    const account = await Account.findByPk(account_id);
    if (!bank) {
        throw { message: "Bank not found.", statusCode: 404 };
    }
    if (!account) {
        throw { message: "Account not found.", statusCode: 404 };
    }
    const existingPixKey = await PIXKEY.findOne({ where: { pixKey: data.pixKey } });
    if (existingPixKey) {
        throw { message: "Existing Pix Key.", statusCode: 400 };
    }
    return await PIXKEY.create(data);
};

const update = async (id, data) => {
    const { typeOfKey } = data;
    const isValidType = validation.pix_key_type.allowedTypes.includes(typeOfKey);
    if (!isValidType) {
        throw { message: "Key type is invalid.", statusCode: 400 };
    }
    if (!validation.pix_key.when.pix_key_type[typeOfKey].pattern.test(data.pixKey)) {
        throw { message: `The value ${data.pix_key} is not valid for the key type: ${data.typeOfKey}.`, statusCode: 400 };
    }
    if (!validation.pix_key.when.pix_key_type['EMAIL'].pattern.test(data.email)) {
        throw { message: "The email is not valid.", statusCode: 400 };
    }
    const { bank_id, account_id } = data;
    const bank = await Bank.findByPk(bank_id);
    const account = await Account.findByPk(account_id);
    if (!bank) {
        throw { message: "Bank not found.", statusCode: 404 };
    }
    if (!account) {
        throw { message: "Account not found.", statusCode: 404 };
    }
    const pixkey = await PIXKEY.findByPk(id);
    if (!pixkey) {
        throw { message: "Pix key not found.", statusCode: 404 };
    }
    return await pixkey.update(data);
};

const remove = async (id) => {
    const pixkey = await PIXKEY.findByPk(id);
    if (!pixkey) {
        throw { message: "Pix key not found.", statusCode: 404 };
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
