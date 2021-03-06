const router = require('express').Router();
const { Sequelize, Product, Review, SubCategorie } = require('../../models');

const validateProductInput = require('../../validation/product');
const upload = require('../../middlewares/multer');

const { Op } = Sequelize;

router.param('productId', function (req, res, next, productId) {
  Product.findOne({
    where: { id: productId },
    attributes: {
      include: [
        [Sequelize.fn('COUNT', Sequelize.col('reviews.userId')), 'n_ratting'],
      ],
    },
    include: {
      model: Review,
      as: 'reviews',
    },
  })
    .then((product) => {
      if (!product) {
        const error = new Error('Product not found');
        error.status = 404;
        throw error;
      }
      req.product = product;
      next();
      return null;
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  Product.findAll()
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product Not Found' });
      }
      res.setHeader('X-Total-Count', product.length);
      res.status(200).json(product);
    })
    .catch(next);
});

router.get('/search/', function (req, res, next) {
  Product.findAll({
    where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
      [Op.like]: `%${req.query.name || ''}%`,
    }),
    include: {
      model: Review,
      as: 'reviews',
    },
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

router.post('/', upload.array('pro_images'), (req, res, next) => {
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

  const { errors, isValid } = validateProductInput(req.body);

  // Check for erors
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const imageArray = [];
  console.log(req.body);
  console.log(req.files);
  for (let i = 0; i < req.files.length; i++) {
    const element = req.files[i];
    console.log(element);
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
        errors.subCategorie = 'SubCategorie not found';
        return res.status(404).json(errors);
      }

      Product.findOne({
        where: {
          name: name,
        },
      })
        .then((product) => {
          if (product) {
            errors.name = 'Name already exist';
            return res.status(404).json(errors);
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
            .then(function (newProduct) {
              res.send(newProduct);
            })
            .catch((err) => next(err));
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

router.delete('/many', function (req, res, next) {
  const { productIdArr } = req.body;
  Product.destroy({ where: { id: productIdArr } })
    .then(function () {
      res.sendStatus(204);
    })
    .catch(next);
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
