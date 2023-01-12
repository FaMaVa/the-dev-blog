const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// TO DO ADD WITH AUTH
router.post('/', withAuth, async (req, res) => {
    // create a new category
    Comment.create({
        comment_content: req.body.comment_content,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
    })
        .then((commentData) => {
            res.json(commentData);
        })
        .catch(err => {
            res.json(err);
        });
});


module.exports = router;