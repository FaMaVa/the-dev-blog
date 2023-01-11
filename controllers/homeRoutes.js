const router = require('express').Router()
const { User, Post, Comment } = require('../models');

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

router.get('/post/:id', async (req, res) => {
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
            res.render('post', post);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get('/comment/:id', async (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        include: { model: User }
    })
        .then((postData) => {
            const post = postData.get({ plain: true });
            res.render('comment', post);
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