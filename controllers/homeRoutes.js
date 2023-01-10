const router = require('express').Router()
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
    res.render('homepage');
})

router.get('/post', async (req, res) => {
    res.render('post');
})

router.get('/comment', async (req, res) => {
    res.render('comment');
})

router.get('/dashboard', async (req, res) => {
    res.render('dashboard');
})

router.get('/dashboard/create', async (req, res) => {
    res.render('create');
})

router.get('/dashboard/update', async (req, res) => {
    res.render('update');
})

router.get('/login', async (req, res) => {
    res.render('login');
})

router.get('/signup', async (req, res) => {
    res.render('signup');
})

module.exports = router;