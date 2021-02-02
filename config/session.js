const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('../src/models/index');

const store = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 1000 * 60 * 5, // 5-min
  expiration: 1000 * 60 * 60 * 24 * 14, // The maximum age (in milliseconds) of a valid session.
});

store.sync();

module.exports = {
  name: 'session',
  store,
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
  },
};
