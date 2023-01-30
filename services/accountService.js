const { Conta } = require('../models/account');
const { PIXKEY } = require('../models/pixkey');


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
    const pixkey = await PIXKEY.findOne({ where: { conta_id: id } });
    if(pixkey){
        throw { message: "Não foi possivel excluir essa conta pois possui uma chave pix associada", statusCode: 400 };
    }
    return await conta.destroy();
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
