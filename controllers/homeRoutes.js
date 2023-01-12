const router = require('express').Router()
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    Post.findAll({
        include:
            { model: User }
    })
        .then((postData) => {
            const posts = postData.map((post) => post.get({ plain: true }));
            res.render('homepage', { posts });
        })
        .catch(err => {
            res.json(err);
        });
});

router.get('/post/:id', withAuth, async (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        include: [ 
            { model: User },
            { 
                model: Comment,
                include: { model: User}
            }
        ]
    })
        .then((postData) => {
            const post = postData.get({ plain: true });
            res.render('post', { post, logged_In: req.session.logged_in});
        })
        .catch(err => {
            res.json(err);
        });
});

router.get('/comment/:id', withAuth, async (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        include: { model: User }
    })
        .then((postData) => {
            const post = postData.get({ plain: true });
            res.render('comment', { post, logged_In: req.session.logged_in});
        })
        .catch(err => {
            res.json(err);
        });
})

router.get('/login', async (req, res) => {
    res.render('login');
})

router.get('/signup', async (req, res) => {
    res.render('signup');
})

module.exports = router;