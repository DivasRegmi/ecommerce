const router = require('express').Router();

const { json } = require('body-parser');
const { Order, User, Cart, Product, Sequelize } = require('../../models');

const { Op } = Sequelize;

const cartOptions = {
  attributes: ['id', 'total'],
  include: {
    model: Product,
    as: 'cartProducts',
    attributes: ['id'],
    through: {
      attributes: ['quantity'],
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
  ],
  attributes: {
    exclude: ['userId'],
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
      // const orderWithProduct = (ordersArr) => {
      //   const newOrders = ordersArr.map(async (order) => {
      //     return {
      //       order,
      //       product: await Product.findAll({
      //         where: {
      //           id: {
      //             [Op.or]: order.productIdArr,
      //           },
      //         },
      //       }),
      //     };
      //   });
      //   return Promise.all(newOrders);
      // };
      // orderWithProduct(orders)
      //   .then((ordersWithProduct) => res.send(ordersWithProduct))
      //   .catch(next);
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
      .then((cart) => {
        if (!cart) {
          res.status(404).send('Cart not found');
        }

        const { cartProducts } = cart;
        const productIdArr = [];
        const quantityIdArr = [];

        console.log(cartProducts);
        if (cartProducts.length === 0) {
          res.status(404).send('No product Found');
        }

        cartProducts.forEach((product) => {
          productIdArr.push(product.id);
          quantityIdArr.push(product.CartProduct.quantity);
        });

        Order.create({
          userId: req.user.id,
          mobileNumber,
          location,
          total: cart.total,
          productIdArr: productIdArr.toString(),
          quantityIdArr: quantityIdArr.toString(),
        })
          .then(() => {
            res.send('Send Order');
          })
          .catch(next);
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
      order
        .delete(req.body)
        .then((updatedorder) => {
          res.send(updatedorder);
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
