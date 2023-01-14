const router = require('express').Router();
const { Comment } = require('../../models');

// TO DO ADD WITH AUTH
router.post('/:id', async (req, res) => {
    try {
      const commentData = await Comment.create(
        {...req.body, 
          user_id: req.session.user_id, 
          post_id:req.params.id});
      res.status(200).json(commentData);
    } catch (error) {
      res.status(500).json(error);
    }
  });


module.exports = router;