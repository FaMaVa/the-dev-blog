const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
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
  
  router.put('/:id', async (req, res) => {
    // update a category by its `id` value
    Post.update(
      {
        post_title: req.body.post_title,
        post_content: req.body.post_content,
      },
      {
        where: {
          id: req.params.id,
        },
      })
      .then((updatedPost) => {
        res.json(updatedPost);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  router.delete('/:id', async (req, res) => {
    // delete a category by its `id` value
    Post.destroy({
        where: {
          id: req.params.id,
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