const router = require('express').Router();
const passport = require('passport');
const { adminMethods, userMethods } = require('../../controllers/auth');

const { isAdmin, isAuth } = require('../../middlewares/auth');

router.get('/logout', (req, res) => {
  req.session.destroy(function () {
    res.clearCookie('session');
    res.redirect('/');
  });
});

// google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google'),
  userMethods.oauthCallback
);

// facebook
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook'),
  userMethods.oauthCallback
);

// /api/auth/registerAdmin
router.post('/registerAdmin', adminMethods.registerAdmin);

// /api/auth/loginAdmin

router.post('/loginAdmin', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      console.log(err);
      return next(err);
    } // error exception

    // user will be set to false, if not authenticated
    if (!user) {
      res.status(401).json(info); // info contains the error message
    } else {
      // if user authenticated maintain the session
      req.logIn(user, function () {
        res.status(200).json(req.session);
      });
    }
  })(req, res, next);
});

router.get('/getAdmin', isAuth, (req, res) => {
  res.json({ user: req.user, session: req.session });
});

module.exports = router;
