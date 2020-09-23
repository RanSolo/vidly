const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { Customer, validate, handle404 } = require("../models/customer");
const { handle400 } = require("../utils/handle400");

router.get("/", async (req, res) => {
	const customers = await Customer.find().sort("name");
	res.send(customers);
});

router.get("/:id", async (req, res) => {
	const _id = req.params.id;
	try {
		const customer = await Customer.findOne({ _id });
		res.send(customer);
	} catch (error) {
		console.error("Error: ", error.message);
		handle404(_id, res);
	}
});

router.post("/", async (req, res) => {
	const error = validate(req.body);
	handle400(error, res);
	const { isGold, name, phone } = req.body;
	let customer = new Customer({ isGold, name, phone });
	try {
		customer = await customer.save();
		res.send(customer);
	} catch (error) {
		console.error("error: ", error.message);
	}
});

router.put("/:id", async (req, res) => {
	const error = validate(req.body);
	handle400(error, res);
	const _id = req.params.id;
	const { name, phone, isGold } = req.body;
	try {
		const customer = await Customer.findOneAndUpdate(
			{ _id },
			{ name, phone, isGold },
			{ new: true },
		);
		res.send(customer);
	} catch (error) {
		handle404(error, _id, res);
	}
});

router.delete("/:id", async (req, res) => {
	const _id = req.params.id;
	const customer = await Customer.findOneAndRemove({ _id });
	handle404(customer, _id, res);
	res.send(customer);
});

module.exports = router;
