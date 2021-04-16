const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Rental, validate } = require('../models/rental');
//const Fawn = require("fawn");
const { Movie } = require('../models/movie');
const {
    getCustomer,
    getMovie,
    handle400,
    handle404
} = require('../utils/utils');

//Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.get('/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const rental = await Rental.findOne({ _id });

        if (!rental) handle404('rental', _id, res);
        if (rental) res.send(rental);
    } catch (error) {
        console.error('Error: ', error.message);
    }
});

router.post('/', async (req, res) => {
    const error = validate(req.body);

    handle400(error, res);
    const rental = await createRental(req.body);

    performPostTransaction(rental);
    res.send(rental);
});

router.delete('/:id', async (req, res) => {
    Rental.findByIdAndRemove(req.params.id, function (err, rental) {
        if (err) console.error('ERROR: ', err);
        if (!rental) handle404('rental', req.params.id, res);
        if (rental) res.send(rental);
    });
});

const createRental = async (reqBody, res) => {
    try {
        const customer = await getCustomer(reqBody.customerId, res);
        const movie = await getMovie(reqBody.movieId, res);

        return newRental(reqBody, movie, customer);
    } catch (error) {
        console.error('error: ', error);
    }
};

const performPostTransaction = async (rental) => {
    //let task = Fawn.Task();
    //try {
    //	task.save("rentals", rental);
    //	task.update(
    //		"movies",
    //		{ _id: mongoose.Types.ObjectId(rental.movie._id) },
    //		{
    //			$inc: { numberInStock: -1 },
    //		},
    //	);
    //	task.run({ useMongoose: true })
    //		.then(function (res) {
    //			console.log("success", res);
    //		})
    //		.catch(function (err) {
    //			res.status(500).send("YOU FAILED");
    //			console.log(err);
    //		});
    //} catch (error) {
    //	console.log(error);
    //}
};

function newRental(reqBody, movie, customer) {
    const { title, dailyRentalRate } = movie;
    const { name, isGold, phone } = customer;

    return new Rental({
        movie: { _id: movie._id, title, dailyRentalRate },
        customer: { _id: customer._id, name, isGold, phone }
    });
}
export default router;
