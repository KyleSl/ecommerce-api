const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  const categories = await Category.findAll({ include: Product });
  res.status(200).send(categories);
});

router.get('/:id', async (req, res) => {
  const category = await Category.findByPk(req.params.id, { include: Product });
  res.status(200).send(category);
});

router.post('/', async (req, res) => {
  const newCat = await Category.create({
    category_name: req.body.category_name,
  });
  res.status(200).send(newCat);
});

router.put('/:id', async (req, res) => {
  await Category.update({ category_name: req.body.category_name }, {
    where: {
      id: req.params.id,
    },
  })
  .then((cat) => {
    res.status(200).send(cat);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
});

router.delete('/:id', async (req, res) => {
  await Category.destroy({
    where: { id: req.params.id }
  })
  .then(() => {
    res.sendStatus(200);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
});

module.exports = router;
