const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Rental, validate, handle404 } = require("../models/movie");
const { Movie } = require("../models/movie");
const { handle400 } = require("../utils/handle400");
const { date } = require("joi");

router.get("/", async (req, res) => {
	const rentals = await Rental.find().sort("-dateOut");
	res.send(rentals);
});

router.get("/:id", async (req, res) => {
	const _id = req.params.id;
	try {
		const movie = await Rental.findOne({ _id });
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
		const rental = createRental(req.body);
		await rental.save();
		res.send(rental);
		console.log("success");
	} catch (error) {
		console.error(error);
	}
});

router.put("/:id", async (req, res) => {
	const error = ValidityState(req.body);
	const movie = await Rental.findOneAndUpdate(
		{ _id: req.params.id },
		{ title: req.body.title },
		{ movie: req.body.movie },
	);
	handle404(movie, req.params.id, res);
	res.send(movie);
});

router.delete("/:id", async (req, res) => {
	const movie = await Rental.findOneAndRemove(req.params.id);
	handle404(rental, req.params.id, res);
	res.send(rental);
});

const createRental = async (reqBody) => {
	const customer = await Customer.findById(reqBody.customerId);
	if (!customer) return res.status(400).sent("Invalid Customer");

	const movie = await Movie.findById(reqBody.movieId);
	if (!movie) return res.status(400).sent("Invalid Movie");

	if (movie.numberInStock === 0)
		return res.status(400).send("Movie Not In Stock");

	const rental = newRental(reqBody, movie, customer);
	movie.numberInStock--;
	this.move.save;
	return rental;
};

const newRental = (reqBody, movie, customer) => {
	const { movieId, customerId, dateOut, dateReturned, rentalFee } = reqBody;
	const { title, dailyRentalRate } = movie;
	const { name, isGold, phone } = customer;
	return new Rental({
		movie: { _id: movieId, title, dailyRentalRate },
		customer: { _id: customerId, name, isGold, phone },
	});
};

module.exports = router;
