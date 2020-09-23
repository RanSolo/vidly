const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Movie, validate, handle404 } = require("../models/movie");
const { Genre } = require("../models/genre");
const { handle400 } = require("../utils/handle400");

router.get("/", async (req, res) => {
	const movies = await Movie.find().sort("name");
	res.send(movies);
});

router.get("/:id/movies", async (req, res) => {
	const movies = await Movie.find().sort("name");
	res.send(movies);
});

router.get("/:id", async (req, res) => {
	const _id = req.params.id;
	try {
		const movie = await Movie.findOne({ _id });
		res.send(movie);
	} catch (error) {
		console.error("Error: ", error.message);
		handle404(_id, res);
	}
});

router.post("/", async (req, res) => {
	const error = validate(req.body);
	handle400(error, res);

	try {
		const movie = createMovie(req.body, res);
		console.log("success");
	} catch (error) {
		console.error(error);
	}
});

router.put("/:id", async (req, res) => {
	const error = ValidityState(req.body);
	const movie = await Movie.findOneAndUpdate(
		{ _id: req.params.id },
		{ title: req.body.title },
		{ genre: req.body.genre },
	);
	handle404(movie, req.params.id, res);
	res.send(movie);
});

router.delete("/:id", async (req, res) => {
	const movie = await Movie.findOneAndRemove(req.params.id);
	handle404(movie, req.params.id, res);
	res.send(movie);
});

const createMovie = async (reqBody, res) => {
	let movie = {};
	try {
		const genre = await Genre.findById(reqBody.genreId);
		if (!genre) return res.status(400).sent("Invalid Genre");
		movie = newMovie(reqBody, genre.name);
	} catch (e) {
		console.error(e);
	}
	try {
		movie = await movie.save();
		return movie;
		console.log("saved", movie);
		res.send(movie);
	} catch (error) {
		console.error("error: ", error.message);
	}
};

const newMovie = (reqBody, name) => {
	const { title, genreId, numberInStock, dailyRentalRate } = reqBody;
	return new Movie({
		title,
		genre: { genreId, name },
		numberInStock,
		dailyRentalRate,
	});
};

module.exports = router;
