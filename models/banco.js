const { sequelize } = require('../config/database');
const Sequelize = require('sequelize')

const Banco = sequelize.define('BANCO', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    agencia: {
      type: Sequelize.STRING,
      allowNull: false
    },
    CC: {
      type: Sequelize.STRING,
      allowNull: false
    },
  }, {
    freezeTableName: true
});

module.exports = { Banco };
