const router = require('express').Router();

const { Cart, Product, CartProduct } = require('../../models');
const getUserCartId = require('../../middlewares/user');

const cartOptions = {
  attributes: {
    exclude: ['userId', 'updatedAt'],
  },
  include: {
    model: Product,
    as: 'cartProducts',
    attributes: {
      exclude: [
        'costPrice',
        'discription',
        'highlights',
        'subCategorieId',
        'createdAt',
        'updatedAt',
      ],
    },
    through: {
      attributes: ['quantity', 'total'],
    },
  },
};

// Get all carts
router.get('/', (req, res, next) => {
  Cart.findAll({
    where: req.query,
    ...cartOptions,
  })
    .then((carts) => {
      res.send(carts);
    })
    .catch(next);
});

// Get user cart
router.get('/user', (req, res) => {
  if (req.user) {
    Cart.findOne({
      where: {
        userId: req.user.id,
      },
      ...cartOptions,
    }).then((cart) => {
      res.send(cart);
    });
  } else {
    res.sendStatus(401);
  }
});

router.post('/:productId', getUserCartId, (req, res, next) => {
  if (req.user) {
    CartProduct.create({
      cartId: req.user.cartId,
      productId: req.params.productId,
      quantity: req.body.quantity ? req.body.quantity : 1,
    })
      .then((cartProduct) => res.status(200).send(cartProduct))
      .catch((err) => next(err));
  } else {
    res.sendStatus(401);
  }
});

router.put('/:productId', getUserCartId, async (req, res, next) => {
  if (req.user) {
    const cartProduct = await CartProduct.findOne({
      where: {
        cartId: req.user.cartId,
        productId: req.params.productId,
      },
    });

    cartProduct
      .update({
        ...cartProduct,
        quantity: req.body.quantity,
      })
      .then((cartProducts) => {
        res.status(200).send(cartProducts);
      })
      .catch((err) => next(err));
  } else {
    res.sendStatus(401);
  }
});

router.delete('/empty', getUserCartId, async (req, res, next) => {
  if (req.user.id) {
    CartProduct.destroy({ where: { cartId: req.user.cartId }, truncate: true })
      .then(function () {
        res.sendStatus(204);
      })
      .catch(next);
  }
});

router.delete('/:productId', getUserCartId, async (req, res, next) => {
  if (req.user.id) {
    CartProduct.destroy({
      where: {
        cartId: req.user.cartId,
        productId: req.params.productId,
      },
    })
      .then(() => {
        res.sendStatus(204);
      })
      .catch(next);
  }
});

module.exports = router;
