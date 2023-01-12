const router = require('express').Router()
const { Post } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res) => {
    Post.findAll({
        where: { user_id: req.session.user_id },
    })
        .then((postData) => {
            const posts = postData.map((post) => post.get({ plain: true }));
            res.render('dashboard', { posts });
        })
        .catch(err => {
            res.json(err);
        });
})

router.get('/create', withAuth, async (req, res) => {
    res.render('create');
})

router.get('/update/:id', withAuth, async (req, res) => {
    Post.findOne({
        where: { 
            id: req.params.id,
            user_id: req.session.user_id,
        }
    })
        .then((postData) => {
            const post = postData.get({ plain: true });
            res.render('update', post);
        })
        .catch(err => {
            res.json(err);
        });
})

module.exports = router;