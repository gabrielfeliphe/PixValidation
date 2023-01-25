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

  //Criado esse método, pois o banco utilizado não permite FK e o ORM utiliza disso caso for relacionado os bancos via código
const GetAllByQuery = sequelize.query('SELECT DISTINCT PIXKEY.*, CONTA.nome as TITULAR, CONTA.cpf_cnpj AS DOCUMENTO, BANCO.nome as NOME_BANCO, BANCO.agencia, BANCO.CC FROM PIXKEY INNER JOIN CONTA ON PIXKEY.conta_id = CONTA.id INNER JOIN BANCO ON PIXKEY.banco_id = BANCO.id', {
    type: sequelize.QueryTypes.SELECT
  });

  module.exports = {PIXKEY,GetAllByQuery};
