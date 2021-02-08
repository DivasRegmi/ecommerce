const router = require('express').Router();

module.exports = router;

router.use('/auth', require('./auth'));
router.use('/product', require('./product'));
router.use('/categorie', require('./categorie_subCategorie'));
router.use('/review', require('./review'));
router.use('/user', require('./user'));
router.use('/cart', require('./cart'));
router.use('/order', require('./order'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
  res.status(404).end();
});
