require('dotenv').config({ path: process.cwd() + '/config/.env' });
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL || 'mysql://root:toor@db:3306/dbapi', {
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
    idle: 2
  },
  //logging: false
});

sequelize.sync({alter: true});

module.exports = {sequelize}