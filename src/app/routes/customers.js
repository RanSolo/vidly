const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');
const { handle400, handle404, getCustomer } = require('../utils/utils');
const modelName = 'customer';

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');

    res.send(customers);
});

router.get('/:id', async (req, res) => {
    getCustomer(req.params.id, res);
    res.send(customers);
});

router.post('/', async (req, res) => {
    const { isGold, name, phone } = req.body;
    const error = validate(req.body);

    handle400(error, res);
    let customer = new Customer({ isGold, name, phone });

    try {
        await customer.save();
        res.send(customer);
    } catch (error) {
        console.error('error: ', error.message);
    }
});

router.put('/:id', (req, res) => {
    const _id = req.params.id;
    const { name, phone, isGold } = req.body;
    const error = validate(req.body);

    if (error) handle400(error, res);
    Customer.findOneAndUpdate(
        { _id },
        { name, phone, isGold },
        { new: true },
        function (error, customer) {
            if (!customer) handle404(modelName, req.params.id, res);
            if (customer) res.send(customer);
            if (error) res.send(error);
        }
    );
});

router.delete('/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id, function (err, customer) {
        if (err) console.error('ERROR: ', err);
        if (!customer) handle404(modelName, req.params.id, res);
        if (customer) res.send(customer);
    });
});

export default router;
