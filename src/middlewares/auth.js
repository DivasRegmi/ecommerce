const bcrypt = require('bcryptjs');
const user = require('../controllers/auth/user');
const { Admin } = require('../models');

const isAdmin = (req, res, next) => {
  if (
    req.isAuthenticated() &&
    typeof req.session.passport !== 'undefined' &&
    req.session.passport
  ) {
    Admin.findOne({
      where: {
        email: req.user.email,
      },
    }).then((admin) => {
      const verifyPassword = req.user.password === admin.password;

      if (!verifyPassword) {
        res.status(401).send('Not Authorized');
      } else {
        next();
      }
    });
  } else {
    res.status(401).send('Not Authorized');
  }
};

const isAuth = (req, res, next) => {
  if (
    !req.isAuthenticated() &&
    typeof req.session.passport === 'undefined' &&
    !req.session.passport
  ) {
    res.status(401).send('Not Authorized');
  } else {
    next();
  }
};

module.exports = { isAuth, isAdmin };
