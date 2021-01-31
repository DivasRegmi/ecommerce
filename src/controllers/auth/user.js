const { User } = require('../../models');

const oauthCallback = (req, res) => {
  const backURL = req.header('Referer') || '/';
  res.redirect(backURL);
};

const oauthCreateUser = (profile, done) => {
  const userCrediential = {
    name: profile.displayName,
    oauthid: profile.id,
    email: profile.emails[0].value,
    provider: profile.provider,
  };

  User.findOne({
    where: {
      email: userCrediential.email,
    },
  })
    .then((userByEmail) => {
      if (userByEmail) {
        done(null, userByEmail);
      } else {
        User.findOne({
          where: {
            oauthid: profile.id,
          },
        })
          .then((userById) => {
            if (userById) {
              done(null, userById);
            } else {
              User.create(userCrediential).then((newUser) => {
                done(null, newUser);
              });
            }
          })
          .catch(() => done(null, false));
      }
    })
    .catch(() => done(null, false));
};

module.exports = {
  oauthCreateUser,
  oauthCallback,
};
