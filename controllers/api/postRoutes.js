const router = require('express').Router();
const { Post } = require('../../models');


router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
        where: { id: req.params.id },
    });

    res.status(200).json(postData);
    
} catch (err) {
    res.status(500).json(err);
};
});

router.post('/', async (req, res) => {
  try {
    const postData = await Post.create
      ({
        ...req.body,
        user_id: req.session.user_id
      });
    const post = postData.get({ plain: true });
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
    res.json(postData);
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

    // Else Return Product Object
    res.json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;