const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  // create a new category
  Post.create({
    post_title: req.body.post_title,
    post_content: req.body.post_content,
    user_id: req.session.user_id,
  })
    .then((postData) => {
      res.json(postData);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put('/:id', withAuth, async (req, res) => {
  // update a category by its `id` value
  Post.update(
    {
      id: req.params.id,
      post_title: req.body.post_title,
      post_content: req.body.post_content,
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    })
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete('/:id', withAuth, async (req, res) => {
  // delete a category by its `id` value
  Post.destroy({
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  })
    .then((deletedPost) => {
      res.json(deletedPost);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;