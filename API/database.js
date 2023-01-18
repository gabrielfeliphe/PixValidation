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
      type: Sequelize.STRING,
      primaryKey: true
    },
    chavepix: {
      type: Sequelize.STRING,
      allowNull: false
    },
    banco_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    conta_id: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
  
  const Conta = sequelize.define('conta', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cpf_cnpj: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  
  const Banco = sequelize.define('banco', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
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
    }
  });
  
  sequelize.sync({ force: true });
