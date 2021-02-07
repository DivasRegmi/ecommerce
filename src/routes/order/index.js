const router = require('express').Router();

const {
  Order,
  User,
  Cart,
  Product,
  OrderProduct,
  sequelize,
} = require('../../models');

const cartOptions = {
  attributes: {
    exclude: ['userId', 'updatedAt'],
  },
  include: {
    model: Product,
    as: 'products',
    attributes: ['id'],
    through: {
      attributes: ['quantity', 'total'],
    },
  },
};

const orderOptions = {
  include: [
    {
      model: User,
      as: 'user',
      attributes: ['name', 'mobile', 'address'],
    },
    {
      model: Product,
      as: 'products',
      attributes: [
        'name',
        'imageArray',
        'seelingPrice',
        'markedPrice',
        'discountPercent',
      ],
      through: {
        attributes: ['quantity', 'total'],
      },
    },
  ],
  attributes: {
    exclude: ['userId', 'deletedAt'],
  },
};

router.param('orderId', (req, res, next, orderId) => {
  Order.findByPk(orderId, orderOptions)
    .then(function (order) {
      if (order) {
        req.order = order;
        next();
        return null;
      }
      const error = new Error('Order not found');
      error.status = 404;
      throw error;
    })
    .catch(next);
});

// Get all orders
router.get('/', (req, res, next) => {
  Order.findAll({
    where: req.query,
    ...orderOptions,
  })
    .then((orders) => {
      res.send(orders);
    })
    .catch(next);
});

// Get all orders with filter (complete, Pending)
router.get('/filter/:orderStatus', (req, res, next) => {
  Order.findAll({
    where: {
      status: req.params.orderStatus,
    },
    ...orderOptions,
  })
    .then((orders) => res.send(orders))
    .catch(next);
});

// Get one order by id
router.get('/:orderId', (req, res) => {
  res.send(req.order);
});

router.post('/', (req, res, next) => {
  const { mobileNumber, location } = req.body;

  if (req.user) {
    Cart.findOne({
      where: { userId: req.user.id },
      ...cartOptions,
    })
      .then(async (cart) => {
        if (!cart) {
          res.status(404).send('Cart not found');
        }
        if (!cart.isNewRecord) {
          res.status(404).send('Already Created');
        }

        try {
          const t = await sequelize.transaction();
          const { products } = cart;

          if (products.length === 0) {
            res.status(404).send('No product Found');
          }
          Order.create(
            {
              userId: req.user.id,
              mobileNumber,
              location,
              total: cart.total,
            },
            {
              transition: t,
            }
          )
            .then((order) => {
              products.forEach((product) => {
                const { total, quantity } = product.CartProduct;

                OrderProduct.create(
                  {
                    orderId: order.id,
                    productId: product.id,
                    quantity,
                    total,
                  },
                  { transaction: t }
                )
                  .then(async () => {
                    await t.commit();
                  })
                  .catch(async (err) => {
                    await t.rollback();
                    next(err);
                  });
              });

              res.send('Send Order');
            })
            .catch(next);
        } catch (error) {
          next(error);
        }
      })
      .catch(next);
  }
});

router.put('/:orderId', (req, res, next) => {
  Order.findByPk(req.params.orderId)
    .then((order) => {
      order
        .update(req.body)
        .then((updatedorder) => {
          res.send(updatedorder);
        })
        .catch(next);
    })
    .catch(next);
});

router.delete('/:orderId', (req, res, next) => {
  Order.findByPk(req.params.orderId)
    .then((order) => {
      if (!order) {
        res.status(404).send('Not found');
      }
      order
        .destroy(req.body)
        .then((updatedorder) => {
          res.send(updatedorder);
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
