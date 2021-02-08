const bcrypt = require('bcryptjs');
const { Admin } = require('../../../models');
const { validateRegistorInput } = require('../../../validation');

/* Register Admin  */

const registerAdmin = (req, res) => {
  const { name, email, password } = req.body;

  const { errors, isValid } = validateRegistorInput(req.body);

  // Check for erors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Admin.findOne({
    where: {
      email,
    },
  })
    .then((admin) => {
      if (admin) {
        errors.email = 'Email already exist';
        return res.status(400).json(errors);
      }

      Admin.create({
        name,
        email,
        password,
      })
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

/* Login Admin */

const loginAdmin = (email, password, done) => {
  Admin.findOne({
    where: {
      email,
    },
  })
    .then((admin) => {
      if (!admin) {
        return done(null, false, { email: 'Email not found' });
      }

      const verifyPassword = bcrypt.compareSync(password, admin.password);

      if (!verifyPassword) {
        return done(null, false, { password: 'password does not match' });
      }

      return done(null, admin);
    })
    .catch((err) => {
      if (err) {
        return done(err);
      }
    });
};

module.exports = { registerAdmin, loginAdmin };
