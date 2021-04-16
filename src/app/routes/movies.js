const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Movie, validate } = require('../models/movie');
const { handle400, handle404, getGenre, getMovie } = require('../utils/utils');
const modelName = 'movie';

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

router.get('/:id/movies', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movie = await getMovie(req.params.id, res);
  if (movie) res.send(movie);
});

router.post('/', async (req, res) => {
  const error = validate(req.body);

  if (error) handle400(error, res);
  try {
    console.log('req', req.body);
    const movie = await createMovie(req.body, res);

    await movie.save();
    res.send(movie);
  } catch (error) {
    console.error(error);
  }
});

router.put('/:id', async (req, res) => {
  const _id = req.params.id;
  const { title, genreId, numberInStock, dailyRentalRate } = req.body;
  const error = validate(req.body);

  if (error) handle400(error, res);
  const genre = await getGenre(genreId, res);

  Movie.findOneAndUpdate(
    { _id },
    { title, genre, numberInStock, dailyRentalRate },
    { new: true },
    function (error, movie) {
      if (!movie) handle404(modelName, req.params.id, res);
      if (movie) res.send(movie);
      if (movie && error) res.send(error);
    }
  );
});

router.delete('/:id', (req, res) => {
  Movie.findByIdAndRemove(req.params.id, function (err, movie) {
    if (err) console.error('ERROR: ', err);
    if (!movie) handle404(modelName, req.params.id, res);
    if (movie) res.send(movie);
  });
});

const createMovie = async (reqBody, res) => {
  try {
    const genre = await getGenre(reqBody.genreId, res);
    reqBody.gName = genre.name;

    return await newMovie(reqBody);
  } catch (e) {
    console.error('error: ', e.message);
  }
};

const newMovie = (reqBody, name) => {
  const { title, genreId, numberInStock, dailyRentalRate, gName } = reqBody;
  return new Movie({
    title,
    genre: { genreId, name: gName },
    numberInStock,
    dailyRentalRate
  });
};

export default router;
