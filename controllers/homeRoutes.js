const router = require('express').Router()
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include:
                { model: User }
        });

        if (!postData) {
            res.status(404).json({ message: "That Post doesn't exist!" });
            return;
        };

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', { posts });

    } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            include: [
                { model: User },
                {
                    model: Comment,
                    include: { model: User }
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: "That Post doesn't exist!" });
            return;
        };

        const post = postData.get({ plain: true });

        res.render('post', { post, loggedIn: req.session.loggedIn });

    } catch (err) {
        res.status(500).json(err);
    };
});



router.get('/comment/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: { id: req.params.id },
            include: { model: User }
        });

        if (!postData) {
            res.status(404).json({ message: "That Post doesn't exist!" });
            return;
        };

        const post = postData.get({ plain: true });

        res.render('comment', { post, loggedIn: req.session.loggedIn });
        
    } catch (err) {
        res.status(500).json(err);
    };
});
    

router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    };

    res.render('login');
})

router.get('/signup', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    };

    res.render('signup');
})

module.exports = router;