require('dotenv').config()
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

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
  }
}, {
  freezeTableName: true
});

const Conta = sequelize.define('conta', {
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
},
  {
    freezeTableName: true
  });

const Banco = sequelize.define('banco', {
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

sequelize.sync();

//Criado esse método, pois o banco utilizado não permite FK e o ORM utiliza disso caso for relacionado os bancos via código
const GetAllByQuery = sequelize.query('SELECT PIXKEY.*, conta.*, banco.* FROM PIXKEY INNER JOIN conta ON PIXKEY.conta_id = conta.id INNER JOIN banco ON PIXKEY.banco_id = banco.id', {
  type: sequelize.QueryTypes.SELECT
});

module.exports = { Banco, Conta, PIXKEY ,GetAllByQuery };