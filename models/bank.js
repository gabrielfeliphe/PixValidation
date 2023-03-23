const { sequelize } = require('../config/connection');
const Sequelize = require('sequelize')

const Bank = sequelize.define('BANK', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    agency: {
      type: Sequelize.STRING, // utilizando o tipo "STRING" para evitar problemas com zeros à esquerda
      allowNull: false
    },
    accountNumber: {
      type: Sequelize.STRING, // utilizando o tipo "STRING" para evitar problemas com zeros à esquerda
      allowNull: false
    },
  }, {
    freezeTableName: true
});

module.exports = { Bank };