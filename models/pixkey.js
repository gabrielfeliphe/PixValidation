const { sequelize } = require('../config/database');
const Sequelize = require('sequelize')

const PIXKEY = sequelize.define('PIXKEY', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    chavepix: {
      type: Sequelize.STRING,
      allowNull: false
    },
    banco_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    conta_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tipochave: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    validado: {
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
