const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre');
const { handle400, handle404, getGenre } = require('../utils/utils');
const { Movie } = require('../models/movie');
const modelName = 'genre';

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');

  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await getGenre(req.params.id, res);

  res.send(genre);
});

router.post('/', async (req, res) => {
  const genre = new Genre({ name: req.body.name });
  const error = validate(req.body);

  if (error) handle400(error, res);
  try {
    await genre.save();
    res.send(genre);
  } catch (error) {
    console.error('error: ', error.message);
  }
});

router.put('/:id', (req, res) => {
  const _id = req.params.id;
  const { name } = req.body;
  const error = validate(req.body);

  if (error) handle400(error, res);
  Genre.findOneAndUpdate(
    { _id },
    { name },
    { new: true },
    function (error, genre) {
      if (!genre) handle404(modelName, _id, res);
      if (genre) res.send(genre);
      if (error) res.send(error);
    }
  );
});

router.delete('/:id', async (req, res) => {
  Genre.findByIdAndRemove(req.params.id, function (err, genre) {
    if (err) console.error('ERROR: ', err);
    if (!genre) handle404(modelName, req.params.id, res);
    if (genre) res.send(genre);
  });
});

export default router;
