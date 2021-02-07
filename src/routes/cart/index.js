const router = require('express').Router();

const { Cart, Product, CartProduct } = require('../../models');
const getUserCartId = require('../../middlewares/user');

const cartOptions = {
  attributes: {
    exclude: ['userId', 'updatedAt'],
  },
  include: {
    model: Product,
    as: 'products',
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

const setCartOrderFalse = (cartId) => {
  Cart.findByPk(cartId)
    .then((cart) => {
      if (cart.ordered) {
        cart
          .update({ ...cart, ordered: false })
          .catch((err) => console.error(err));
      }
    })
    .catch((err) => console.error(err));
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

router.post('/:productId', getUserCartId, async (req, res, next) => {
  if (req.user) {
    CartProduct.create({
      cartId: req.user.cartId,
      productId: req.params.productId,
      quantity: req.body.quantity ? req.body.quantity : 1,
    })
      .then((cartProduct) => {
        setCartOrderFalse(req.user.cartId);
        res.status(200).send(cartProduct);
      })
      .catch((err) => next(err));
  } else {
    res.sendStatus(401);
  }
});

router.put('/:productId', getUserCartId, async (req, res, next) => {
  if (req.user) {
    CartProduct.findOne({
      where: {
        cartId: req.user.cartId,
        productId: req.params.productId,
      },
    })
      .then((cartProduct) => {
        if (!cartProduct) {
          res.send('Not Found ');
        }
        cartProduct
          .update({
            ...cartProduct,
            quantity: req.body.quantity,
          })
          .then((products) => {
            setCartOrderFalse(req.user.cartId);
            res.status(200).send(products);
          })
          .catch((err) => next(err));
      })
      .catch(next);
  } else {
    res.sendStatus(401);
  }
});

router.delete('/empty', getUserCartId, async (req, res, next) => {
  if (req.user.id) {
    CartProduct.destroy({ where: { cartId: req.user.cartId }, truncate: true })
      .then(function () {
        setCartOrderFalse(req.user.cartId);
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
        setCartOrderFalse(req.user.cartId);
        res.sendStatus(204);
      })
      .catch(next);
  }
});

module.exports = router;
