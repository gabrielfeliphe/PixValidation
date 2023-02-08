const { sequelize } = require('../config/database');
const Sequelize = require('sequelize')

const Bank = sequelize.define('BANCO', {
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
      type: Sequelize.INTEGER,
      allowNull: false
    },
    CC: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  }, {
    freezeTableName: true
});

module.exports = { Bank };