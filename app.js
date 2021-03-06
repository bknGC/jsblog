const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Подлключаем конфиг
const config = require('./config');

// Подключенные модели
const Post = require('./models/post');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    Post.find({}).then(posts => {
        res.render('index', { posts: posts});
    })
});

app.get('/create', (req, res) => res.render('create'));
app.post('/create', (req, res) => {
const { title, body } = req.body;


    Post.create({
       title: title,
       body: body
    }).then(post => console.log(post.id));

    res.redirect('/');
});

module.exports = app;