const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  // create a new category
  try {
    const postData = await Post.create(req.body);
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      req.status(404).json({ message: "Post doesn't exist!" });
      return;
    }
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  };
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Return Error Message if no product is found
    if (!postData) {
      res.status(404).json({ message: "That Post doesn't exist!" });
      return;
    }

    // Else Return Product Object
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;