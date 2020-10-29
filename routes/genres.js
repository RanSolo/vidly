const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genre");
const { handle400 } = require("../utils/handle400");
const { handle404 } = require("../utils/handle404");

router.get("/", async (req, res) => {
	const genres = await Genre.find().sort("name");
	res.send(genres);
});

router.get("/:id", async (req, res) => {
	const _id = req.params.id;
	try {
		const genre = await Genre.findOne({ _id });
		res.send(genre);
	} catch (error) {
		console.error("Error: ", error.message);
		handle404("genre", _id, res);
	}
});

router.post("/", async (req, res) => {
	const error = validate(req.body);
	handle400(error, res);
	const genre = new Genre({ name: req.body.name });
	try {
		await genre.save();
		res.send(genre);
	} catch (error) {
		console.error("error: ", error.message);
	}
});

router.put("/:id", async (req, res) => {
	const error = ValidityState(req.body);
	const genre = await Genre.findOneAndUpdate(
		{ _id: req.params.id },
		{ name: req.body.name },
		{ new: true },
	);
	handle404(genre, req.params.id, res);
	res.send(genre);
});

router.delete("/:id", async (req, res) => {
	Genre.findByIdAndRemove(req.params.id, function (err, genre) {
		if (err) console.error("ERROR: ", err);
		if (!genre) handle404("genre", req.params.id, res);
		if (genre) res.send(genre);
	});
});

module.exports = router;
