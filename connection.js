// --- import dependencies ---
const mysql = require('mysql2');

// --- create the connection to database ---
const db = mysql.createConnection(
    { 
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employee_management_db'
    },
    console.log(`Connected to the employee management database.`)
);

module.exports = db;

const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3001
  }
);

module.exports = sequelize;
