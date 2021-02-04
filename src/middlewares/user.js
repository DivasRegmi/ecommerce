const { Cart } = require('../models');

const getUserCartId = (req, res, next) => {
  if (req.user) {
    Cart.findOrCreate({
      where: {
        userId: req.user.id,
      },
    }).then((cart) => {
      req.user.cartId = cart[0].id;
      next();
    });
  } else {
    res.status(401).send('Not Authorized');
  }
};

module.exports = getUserCartId;
