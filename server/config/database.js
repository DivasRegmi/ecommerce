require('dotenv').config();

module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: '127.0.0.1',
  dialect: 'mysql',
  timezone: '+05:45',
};
