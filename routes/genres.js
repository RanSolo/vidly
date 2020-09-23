const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Genre, validate, handle404 } = require("../models/genre");
const { handle400 } = require("../utils/handle400");

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
		handle404(_id, res);
	}
});

router.post("/", async (req, res) => {
	const error = validate(req.body);
	if (error) return res.status(400).send(error.details);
	let genre = new Genre({ name: req.body.name });
	try {
		genre = await genre.save();
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
	const genre = await Genre.findOneAndRemove(req.params.id);
	handle404(genre, req.params.id, res);
	res.send(genre);
});

module.exports = router;
