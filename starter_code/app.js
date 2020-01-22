const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials");

// add the routes here
app.get('/', (req, res, next) => res.render('index'));

app.get('/beers', (req, res, next) => {
    punkAPI.getBeers()
        .then(beers => res.render('beers', {beers}))
        .catch(error => console.log(error));
});

app.get('/beers/beer-:id', (req, res, next) => {
    let id = req.params.id;
    punkAPI.getBeer(id)
        .then(beer => res.render('random-beers', beer))
        .catch(error => console.log(error));
});

app.get('/random-beers', (req, res, next) => {
    punkAPI.getRandom()
        .then(beer => res.render('random-beers', beer))
        .catch(error => console.log(error));
});

app.listen(3000, () => console.log('Server is running!'));