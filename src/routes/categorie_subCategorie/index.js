const router = require('express').Router();
const { Review, Categorie, SubCategorie } = require('../../models');

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
  Categorie.findAll({ include: [SubCategorie] })
    .then(function (categorie) {
      res.send(categorie);
    })
    .catch(next);
});
router.get('/subCategorie', (req, res, next) => {
  SubCategorie.findAll()
    .then(function (categorie) {
      res.send(categorie);
    })
    .catch(next);
});

// Get all products with one subCategorieId
router.get('/:subCategorieId', (req, res, next) => {
  req.SubCategorie.getProducts({
    include: [Review],
  })
    .then(function (products) {
      res.status(200).send(products);
    })
    .catch(next);
});

// Create new categorie
router.post('/', (req, res, next) => {
  const { name } = req.body;
  console.log(name, req.body.name);
  Categorie.create({ name })
    .then(function (categorie) {
      res.status(200).send(categorie);
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
router.put('/:subCategorieId', function (req, res, next) {
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
