const { sequelize } = require('../config/database');
const Sequelize = require('sequelize')

const Account = sequelize.define('CONTA', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf_cnpj: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        freezeTableName: true
});

module.exports = {Account};

