const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// TO DO ADD WITH AUTH
router.post('/', async (req, res) => {
    try {
      const commentData = await Comment.create(req.body);
      res.status(200).json(commentData);
    } catch (error) {
      res.status(500).json(error);
    }
  });


module.exports = router;