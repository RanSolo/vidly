const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const { handle400 } = require("../utils/handle400");
const { handle404 } = require("../utils/handle404");

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
		const movie = await createMovie(req.body, res);
		await movie.save();
		console.log("movie", movie);
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

router.delete("/:id", (req, res) => {
	Movie.findByIdAndRemove(req.params.id, function (err, movie) {
		if (err) console.error("ERROR: ", err);
		if (!movie) handle404("movie", req.params.id, res);
		if (movie) res.send(movie);
	});
});

const createMovie = async (reqBody, res) => {
	try {
		const genre = await Genre.findById(reqBody.genreId);
		if (!genre) return res.status(400);
		reqBody.gName = genre.name;
		return await newMovie(reqBody);
	} catch (e) {
		console.error("error: ", e.message);
	}
};

const newMovie = (reqBody, name) => {
	const { title, genreId, numberInStock, dailyRentalRate, gName } = reqBody;
	return new Movie({
		title,
		genre: { genreId, name: gName },
		numberInStock,
		dailyRentalRate,
	});
};

module.exports = router;
