const router = require('express').Router();

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  res.send(id);
});

module.exports = router;
