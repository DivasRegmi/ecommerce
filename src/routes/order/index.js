const router = require('express').Router();

const { Order, User, Cart, Product } = require('../../models');

const getUserCartId = require('../../middlewares/user');

const cartOptions = {
  attributes: ['id', 'total'],
  include: {
    model: Product,
    as: 'cartProducts',
    attributes: [
      'imageArray',
      'seelingPrice',
      'name',
      'brand',
      'markedPrice',
      'discountPercent',
    ],
    through: {
      attributes: ['total', 'quantity'],
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
      model: Cart,
      as: 'cart',
      ...cartOptions,
    },
  ],
  attributes: ['mobileNumber', 'location', 'status', 'createdAt', 'updatedAt'],
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
    .then(function (orders) {
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

router.post('/', getUserCartId, (req, res, next) => {
  const { mobileNumber, location } = req.body;
  if (req.user) {
    Order.create({
      userId: req.user.id,
      cartId: req.user.cartId,
      mobileNumber,
      location,
    })
      .then(() => {
        res.send('Send Order');
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

module.exports = router;
