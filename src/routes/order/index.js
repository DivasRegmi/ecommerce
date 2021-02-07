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
      required: true,
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
      console.log('***************');
      console.log();
      console.log(JSON.stringify(orders));
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
          return res.status(404).send('Cart not found');
        }
        if (cart.ordered) {
          return res.status(404).send('Already ordered');
        }

        const { products } = cart;
        if (products.length === 0) {
          return res.status(404).send('No product Found');
        }

        const t = await sequelize.transaction();
        try {
          const order = await Order.create(
            {
              userId: req.user.id,
              mobileNumber,
              location,
              total: cart.total,
            },
            {
              transition: t,
            }
          );

          Promise.all(
            products.map(async (product) => {
              const { total, quantity } = product.CartProduct;

              await OrderProduct.create(
                {
                  orderId: order.id,
                  productId: product.id,
                  quantity,
                  total,
                },
                { transaction: t }
              );
            })
          ).then(() => {
            t.commit();
            res.send('Send Order');
          });
        } catch (error) {
          await t.rollback();
          next(error);
        }
      })
      .catch();
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
