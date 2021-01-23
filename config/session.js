const session = require('express-session');
const bcrypt = require('bcryptjs');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { sequelize } = require('../src/models/index');

const store = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 1000 * 60 * 5, // 5-min
});

const secret = () => {
  const salt = bcrypt.genSaltSync(2);
  return bcrypt.hashSync(process.env.SESSION_KEY, salt);
};

// store.sync();

module.exports = {
  name: 'session',
  store,
  secret: secret(),
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 14,
  },
};
