const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
    try {
      const CategoryData = await Category.findAll({
        include: [{ model: Product }],
      });
      res.status(200).json(CategoryData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const CategoryData= await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!CategoryData) {
      res.status(404).json({ message: "No library card found with that id!" });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
    try {
      const locationData = await Category.create({
        reader_id: req.body.reader_id,
      });
      res.status(200).json(locationData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const CategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!CategoryData) {
      res.status(404).json({ message: "No library card found with that id!" });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
