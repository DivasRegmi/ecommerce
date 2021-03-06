const router = require('express').Router();
const { Categorie, SubCategorie, Product } = require('../../models');
const validateCategorieInput = require('../../validation/categorie');

router.param('categorieId', function (req, res, next, categorieId) {
  Categorie.findByPk(categorieId)
    .then(function (categorie) {
      if (categorie) {
        req.categorie = categorie;
        next();
        return null;
      }
      const error = new Error('some message');
      error.status = 404;
      throw error;
    })
    .catch(next);
});
router.param('subCategorieId', function (req, res, next, subCategorieId) {
  SubCategorie.findByPk(subCategorieId)
    .then(function (subCategorie) {
      if (subCategorie) {
        req.subCategorie = subCategorie;
        next();
        return null;
      }
      const error = new Error('some message');
      error.status = 404;
      throw error;
    })
    .catch(next);
});

// Get all categories
router.get('/', (req, res, next) => {
  Categorie.findAll({
    include: {
      model: SubCategorie,
      as: 'SubCategories',
      attributes: ['id', 'name'],
    },
  })
    .then(function (categorie) {
      res.send(categorie);
    })
    .catch(next);
});
router.get('/subCategorie', (req, res, next) => {
  SubCategorie.findAll({
    include: [
      {
        model: Product,
        as: 'Products',
        attributes: ['id', 'name'],
      },
      {
        model: Categorie,
        as: 'Categorie',
        attributes: ['id', 'name'],
      },
    ],
  })
    .then(function (subCategorie) {
      res.send(subCategorie);
    })
    .catch(next);
});

// Get all products with one subCategorieId
router.get('/:subCategorieId', (req, res, next) => {
  // req.subCategorie.getProducts().then((prducts) => console.log(prducts));
  // next();
  req.subCategorie
    .getProducts()
    .then(function (products) {
      res.status(200).send(products);
    })
    .catch(next);
});

// Create new categorie
router.post('/', (req, res, next) => {
  const { name } = req.body;
  const { errors, isValid } = validateCategorieInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  Categorie.findOne({
    where: {
      name,
    },
  })
    .then((categorie) => {
      if (categorie) {
        errors.name = 'Categorie already exist';
        return res.status(400).json(errors);
      }
      Categorie.create({ name })
        .then(function (newCategorie) {
          res.status(200).send(newCategorie);
        })
        .catch(next);
    })
    .catch(next);
});

// create new subCategorie
router.post('/subCategorie', (req, res, next) => {
  const { name, categorieId } = req.body;
  SubCategorie.create({
    name,
    categorieId,
  })
    .then(function (subCategorie) {
      res.status(200).send(subCategorie);
    })
    .catch(next);
});

router.put('/:categorieId', function (req, res, next) {
  const { name } = req.body;
  req.categorie
    .update({ name })
    .then(function (categorie) {
      res.send(categorie);
    })
    .catch(next);
});

router.put('/subcategorie/:subCategorieId', function (req, res, next) {
  const { name, categorieId } = req.body;
  req.subCategorie
    .update({ name, categorieId })
    .then(function (subCategorie) {
      res.send(subCategorie);
    })
    .catch(next);
});

router.delete('/:categorieId', (req, res, next) => {
  req.categorie
    .destroy()
    .then(function () {
      res.sendStatus(204);
    })
    .catch(next);
});
router.delete('/:subCategorieId', (req, res, next) => {
  req.subCategorieId
    .destroy()
    .then(function () {
      res.sendStatus(204);
    })
    .catch(next);
});

module.exports = router;
