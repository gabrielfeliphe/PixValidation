const { sequelize } = require('../config/connection');
const Sequelize = require('sequelize')

const PIXKEY = sequelize.define('PIXKEY', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pixKey: {
      type: Sequelize.STRING,
      allowNull: false
    },
    bank_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    account_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    typeOfKey: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  }, {
    freezeTableName: true
  });

  const GetAllByQuery = (query) => sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

  module.exports = {PIXKEY,GetAllByQuery};

