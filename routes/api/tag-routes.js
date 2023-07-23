const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  await Tag.findAll({ include: Product })
  .then((tags) => {
    res.status(200).send(tags);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

router.get('/:id', async (req, res) => {
  await Tag.findByPk(req.params.id, { include: Product })
  .then((tag) => {
    res.status(200).send(tag);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

router.post('/', async (req, res) => {
  await Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((newTag) => {
    res.status(200).send(newTag);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

router.put('/:id', async (req, res) => {
  await Tag.update({ tag_name: req.body.tag_name }, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => {
    res.status(200).send(tag);
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

router.delete('/:id', async (req, res) => {
  await Tag.destroy({
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
