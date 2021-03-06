const router = require('express').Router();

const { Review, Sequelize } = require('../../models');
const { isAuth } = require('../../middlewares/auth');
const { route } = require('../product');

router.param('reviewId', (req, res, next, reviewId) => {
  Review.findByPk(reviewId)
    .then((review) => {
      if (review) {
        req.review = review;
        next();
        return null;
      }
      const error = new Error('Review not found by Id');
      error.status = 404;
      throw error;
    })
    .catch(next);
});

// Get all reviews
router.get('/', (req, res, next) => {
  Review.findAll()
    .then(function (reviews) {
      res.send(reviews);
    })
    .catch(next);
});

router.get('/rating/:productId', (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.productId,
    },
    attributes: [
      'rating',
      [Sequelize.fn('COUNT', Sequelize.col('rating')), 'count'],
    ],
    group: 'rating',
  })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => next(err));
});

// Get one review by id
router.get('/:reviewId', (req, res) => {
  res.send(req.review);
});

// Create a review for a product
router.post('/product/:productId', isAuth, (req, res, next) => {
  if (req.user) {
    const { rating, comment } = req.body;
    console.log('**************');
    console.log('rating', rating, { ...req.body });
    Review.create({
      rating,
      comment,
      userId: req.user.id,
      productId: req.params.productId,
    })
      .then((review) => {
        res.status(200).send(review);
      })
      .catch((err) => next(err));
  } else {
    res.sendStatus(401);
  }
});

router.put('/:reviewId', function (req, res, next) {
  const { rating = req.review.rating, comment = req.review.comment } = req.body;
  console.log(rating, comment, req.body.rating);
  req.review
    .update({
      ...req.review,
      rating: rating,
      comment: comment,
    })
    .then(function (review) {
      res.send(review);
    })
    .catch(next);
});

router.delete('/:reviewId', function (req, res, next) {
  if (req.user.isAdmin || req.user.id === req.review.userId) {
    req.review
      .destroy()
      .then(function () {
        res.sendStatus(204);
      })
      .catch(next);
  }
});

module.exports = router;
