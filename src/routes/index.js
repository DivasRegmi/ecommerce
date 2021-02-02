const router = require('express').Router();

module.exports = router;

router.use('/auth', require('./auth'));
router.use('/product', require('./product'));
router.use('/categorie', require('./categorie_subCategorie'));
router.use('/review', require('./review'));
router.use('/user', require('./user'));
router.use('/user/cart', require('./cart'));
// router.use('/address', require('./address'));
// router.use('/billing', require('./billing'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
  res.status(404).end();
});
