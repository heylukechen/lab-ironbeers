const { error } = require('console');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); //local path to files
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { twentyFiveBeers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log('One random beer from the database', responseFromAPI);
      res.render('randomBeer', {
        randomBeer: responseFromAPI[0],
        foodPairing: responseFromAPI[0].food_pairing
      });
    })
    .catch(error => console.log(error));
});

app.get('/beers/:id', (req, res) => {
  punkAPI.getBeer(req.params.id).then(response => {
    res.render('singleBeer', {singleBeer: response[0]});
  }).catch(error => console.log(error))
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
