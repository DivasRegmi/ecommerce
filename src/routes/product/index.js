const router = require('express').Router();
const { Sequelize, Product, Review, SubCategorie } = require('../../models');

const upload = require('../../middlewares/multer');

const { Op } = Sequelize;

router.param('productId', function (req, res, next, productId) {
  Product.findOne({
    where: {
      id: productId,
    },
    include: [Review],
  })
    .then((product) => {
      if (product) {
        req.product = product;
        next();
        return null;
      }
      const error = new Error('some message');
      error.status = 404;
      throw error;
    })
    .catch(next);
});

router.get('/all', (req, res, next) => {
  Product.findAll()
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product Not Found' });
      }
      res.status(200).json(product);
    })
    .catch(next);
});

router.get('/search/', function (req, res, next) {
  Product.findAll({
    where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
      [Op.like]: `%${req.query.name || ''}%`,
    }),
    include: [Review],
  })
    .then(function (products) {
      if (!products) {
        return res.status(404).json({ message: `Product Not Found` });
      }

      res.send(products);
    })
    .catch(next);
});

// router.get('/by/search/', function (req, res, next) {
//   const order = req.query.order ? req.query.order.toUpperCase() : 'ASC';
//   const sortBy = req.query.sortBy ? req.query.sortBy : 'id';

//   Product.findAll({
//     where: {},
//     include: [Review],
//   })
//     .then(function (products) {
//       if (!products) {
//         return res.status(404).json({ message: `Product Not Found` });
//       }

//       res.send(products);
//     })
//     .catch(next);
// });

router.get('/:productId', (req, res) => {
  res.send(req.product);
});

router.post('/:productId', upload.array('pro_images'), (req, res, next) => {
  const {
    name,
    subCategorie,
    brand,
    highlights,
    discription,
    isOutOfStock,
    costPrice,
    markedPrice,
    discountPercent,
  } = req.body;

  const imageArray = [];

  for (let i = 0; i < req.files.length; i++) {
    const element = req.files[i];
    imageArray.push(element.filename);
  }

  SubCategorie.findOne({
    where: Sequelize.where(
      Sequelize.fn('lower', Sequelize.col('name')),
      subCategorie
    ),
  })
    .then((subcategorie) => {
      if (!subcategorie) {
        res.status(404).json({ message: 'SubCategorie not found' });
      }
      Product.create({
        name,
        brand,
        discription,
        highlights,
        isOutOfStock,
        costPrice,
        markedPrice,
        discountPercent,
        imageArray: imageArray.toString(),
        subCategorieId: subcategorie.id,
        rating: 0,
      })
        .then(function (product) {
          res.send(product);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.put('/:productId', upload.array('pro_images'), function (req, res) {
  const imageArray = [];
  let subCategorieId;

  req.product.imageArray.forEach((value) => {
    imageArray.push(value);
  });

  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const element = req.files[i];
      imageArray.push(element.filename);
    }
  }

  if (req.body.subCategorie) {
    SubCategorie.findOne({
      where: Sequelize.where(
        Sequelize.fn('lower', Sequelize.col('name')),
        req.body.subCategorie
      ),
    }).then((subCategorie) => {
      if (!subCategorie) {
        res.status(404).json({ message: 'SubCategorie not found' });
      }
      subCategorieId = subCategorie.id;
    });
  }

  req.product
    .update({
      ...req.product,
      ...req.body,
      imageArray: imageArray.toString(),
      subCategorieId: subCategorieId,
    })
    .then((updatedProduct) => {
      return res.status(200).json(updatedProduct);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

router.delete('/:productId', function (req, res, next) {
  req.product
    .destroy()
    .then(function () {
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;
