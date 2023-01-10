const router = require('express').Router()
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
    res.render('homepage');
})

router.get('/dashboard', async (req, res) => {
    res.render('dashboard');
})

router.get('/login', async (req, res) => {
    res.render('login');
})

router.get('/signup', async (req, res) => {
    res.render('signup');
})

module.exports = router;