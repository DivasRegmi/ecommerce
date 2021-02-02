const router = require('express').Router();
const { json } = require('body-parser');
const { use } = require('passport');
const user = require('../../controllers/auth/user');
const { User, Product, FavList } = require('../../models');

// Get all users
router.get('/', (req, res, next) => {
  User.findAll({
    where: req.query,
    attributes: {
      exclude: ['oauthid', 'updatedAt'],
    },
    include: {
      model: Product,
      as: 'favLists',
      attributes: ['name', 'id'],
      through: { attributes: [] },
    },
  })
    .then(function (users) {
      res.send(users);
    })
    .catch(next);
});

// Get a user's info, including orders, addresses, billing for personal info page
// router.use('/info', function (req, res, next) {
//   if (req.user) {
//     User.findOne({
//       where: {
//         id: req.user.id,
//       },
//       include: [
//         {
//           model: Order,
//           include: [Product, ProductOrders],
//         },
//         Address,
//         Billing,
//       ],
//     }).then(function (user) {
//       if (user) {
//         req.loggedInUser = user;
//         next();
//         return null;
//       }
//     });
//   } else {
//     res.send();
//   }
// });

// middleware for all routes that use userId
router.param('userId', (req, res, next, userId) => {
  User.findByPk(userId, {
    attributes: {
      exclude: ['oauthid', 'updatedAt'],
    },
  })
    .then(function (userInfo) {
      if (userInfo) {
        req.userInfo = userInfo;
        next();
        return null;
      }
      const error = new Error('some message');
      error.status = 404;
      throw error;
    })
    .catch(next);
});

router.get('/:userId', function (req, res) {
  res.send(req.userInfo.getFavLists());
});

router.post('/addFav/:productId', async (req, res, next) => {
  if (req.user) {
    FavList.create({
      userId: req.user.id,
      productId: req.params.productId,
    })
      .then(() => res.status(200).send('done'))
      .catch((err) => next(err));
  } else {
    res.send(401);
  }
});

router.put('/:userId', function (req, res, next) {
  if (req.user.id === req.userInfo.id) {
    const {
      name = req.user.name,
      email = req.user.email,
      mobile = req.user.mobile,
      address = req.user.address,
    } = req.body;
    req.userInfo
      .update({
        name,
        email,
        mobile,
        address,
      })
      .then(function (user) {
        res.send(user);
      })
      .catch(next);
  } else {
    res.status(401);
  }
});

module.exports = router;
