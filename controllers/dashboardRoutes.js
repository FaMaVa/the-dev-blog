const router = require('express').Router()
const { Post } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id }
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/create', withAuth, async (req, res) => {
    res.render('create', { loggedIn: req.session.loggedIn });
})

router.get('/update/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
            }
        });

        const post = await postData.get({ plain: true });

        res.render('update', { post, loggedIn: req.session.loggedIn });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;