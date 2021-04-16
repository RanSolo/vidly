const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();
const { User, validate } = require('../models/user');
const { isEmailUnique, handle400, handle404 } = require('../utils/utils');
const modelName = 'user';

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');

    res.send(users);
});

router.get('/:id', async (req, res) => {
    User.findById(req.params.id, (e, user) => {
        if (user) res.send(user);
        if (e && user) res.send(e);
        if (e) res.send(e);
    });
});

router.post('/', async (req, res) => {
    const { email, name, password } = req.body;
    let user = new User({ email, name, password });
    let error = validate(req.body);
    const isUnique = await isEmailUnique(email);
    const salt = await bcrypt.genSaltSync(10);

    user.password = await bcrypt.hashSync(user.password, salt);
    if (error.details) return res.status(400).send(error.details);
    if (!isUnique) return res.status(400).send(`Email: ${email} is not unique`);
    saveUser(user, res);
});

router.put('/:id', (req, res) => {
    const error = validate(req.body);

    if (error) handle400(error, res);
    updateUser(req, res);
});

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) console.error('ERROR: ', err);
        if (!user) handle404(modelName, req.params.id, res);
        if (user) res.send(user);
    });
});

const updateUser = (req, res) => {
    const _id = req.params.id;

    User.findOne({ _id }, (serverError, user) => {
        const userClone = { ...user };
        userClone.name = req.body.name;
        console.log('useclone', userClone);
        let error = validate(userClone);
        if (error.details) return res.status(400).send(error.details);
        saveUser(userq, res);

        handleUpdateRes(serverError, user, res);
    });
};

const handleUpdateRes = async (error, user, res) => {
    if (!user) handle404(modelName, _id, res);
    if (user) res.send(user);
    if (error) res.send(error);
};

const saveUser = async (user, res) => {
    user.save({}, (e, user) => {
        if (e && !error.details) return res.status(400).send(e.message);
        if (user) {
            res
                .header(
                    'x-auth-token',
                    jwt.sign({ _id: res.user._id }, config.get('jwtPrivateKey'))
                )
                .send(user);
        }
        res.send();
    });
};

export default router;
