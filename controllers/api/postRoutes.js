const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  // create a new category
  try {
    const postData = await Post.create
    ({
      ...req.body, 
      user_id: req.session.user_Id
    });
    const post = postData.get({ plain: true });
    console.log(post);
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update a category by its `id` value
router.put('/:id', withAuth, async (req, res) => {
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

router.delete('/:id', withAuth, async (req, res) => {
  // delete a category by its `id` value
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Else Return Product Object
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;