const { sequelize } = require('../API/config/connection');
const Sequelize = require('sequelize')

const Account = sequelize.define('ACCOUNT', {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    federalDocument: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        freezeTableName: true
});

module.exports = {Account};

