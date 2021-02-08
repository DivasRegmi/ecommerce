const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const { Admin, User } = require('../src/models/index');
const oauth = require('./oauth');

const { userMethods, adminMethods } = require('../src/routes/auth/controller');

module.exports = (passport) => {
  /* Local Strategy for Admin login and auth  */
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      function (username, password, done) {
        adminMethods.loginAdmin(username, password, done);
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: oauth.GOOGLE_CLIENT_ID,
        clientSecret: oauth.GOOGLE_CLIENT_SECRET,
        callbackURL: oauth.GOOGLE_CLIENT_CALLBACK,
      },
      function (token, tokenSecret, profile, done) {
        console.log(profile);
        userMethods.oauthCreateUser(profile, done);
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: oauth.FACEBOOK_APP_ID,
        clientSecret: oauth.FACEBOOK_APP_SECRET,
        callbackURL: oauth.FACEBOOK_APP_CALLBACK,
        profileFields: ['id', 'displayName', 'email'],
      },
      function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        userMethods.oauthCreateUser(profile, done);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, { id: user.id, isAdmin: user.isAdmin });
  });

  passport.deserializeUser((user, done) => {
    if (user.isAdmin) {
      Admin.findByPk(user.id).then((admin) => {
        return done(null, admin);
      });
    } else {
      User.findByPk(user.id).then((userData) => done(null, userData));
    }
  });
};
