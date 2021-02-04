const router = require('express').Router();

const { Cart, Product, CartProduct } = require('../../models');

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

// Get cart by Id
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

router.post('/:productId', (req, res, next) => {
  if (req.user) {
    Cart.findOne({
      where: {
        userId: req.user.id,
      },
    }).then((cart) => {
      CartProduct.create({
        cartId: cart.id,
        productId: req.params.productId,
        quantity: req.body.quantity ? req.body.quantity : 1,
      })
        .then((cartProduct) => res.status(200).send(cartProduct))
        .catch((err) => next(err));
    });
  } else {
    res.sendStatus(401);
  }
});

router.put('/:productId', (req, res, next) => {
  if (req.user) {
    Cart.findOne({
      where: {
        userId: req.user.id,
      },
    }).then(async (cart) => {
      const cartProduct = await CartProduct.findOne({
        where: {
          cartId: cart.id,
          productId: req.params.productId,
        },
      });

      cartProduct
        .update({
          ...cart,
          quantity: req.body.quantity,
        })
        .then((cartProducts) => {
          res.status(200).send(cartProducts);
        })
        .catch((err) => next(err));
    });
  } else {
    res.sendStatus(401);
  }
});

router.delete('/all', async (req, res, next) => {
  if (req.user.id) {
    CartProduct.destroy({ where: {}, truncate: true })
      .then(function () {
        res.sendStatus(204);
      })
      .catch(next);
  }
});

router.delete('/:productId', async (req, res, next) => {
  if (req.user.id) {
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
      },
    });

    CartProduct.destroy({
      where: {
        cartId: cart.id,
        productId: req.params.productId,
      },
    })
      .then(() => {
        res.sendStatus(204);
      })
      .catch(next);
  }

  //   const cartProduct = await CartProduct.findOne({
  //     where: {
  //       cartId: cart.id,
  //       productId: req.params.productId,
  //     },
  //   });

  //   cartProduct
  //     .destroy()
  //     .then((deletedProduct) => {
  //       res.send(deletedProduct);
  //     })
  //     .catch(next);
  // }
});

module.exports = router;
