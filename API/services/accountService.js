const { Account } = require('../models/account');

const { PIXKEY } = require('../models/pixkey');

const getAll = async () => {
    return await Account.findAll();
};

const getById = async (id) => {
    return await Account.findByPk(id);
};

const create = async (data) => {
    return  await Account.create(data);
}

const update = async (id, data) => {
    const account = await Account.findByPk(id);
    return await account.update(data);
};

const remove = async (id) => {
    const account = await Account.findByPk(id);
    const pixkey = await PIXKEY.findOne({ where: { account_id: id } });
    if(pixkey){
        throw { message: "It was not possible to delete this account because it has an associated pix key.", statusCode: 400 };
    }
    return await account.destroy();
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
