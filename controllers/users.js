const express = require('express');
const User = require('../models/User')
const bcrypt = require('bcrypt')
const {createUserToken } = require('../middleware/auth')

const router = express.Router();

// SIGN UP
// POST /api/signup
router.post('/signup', (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then(hash =>
        // return a new object with the email and hashed password
        // when returning an object with fat arrow syntax, we
        // need to wrap the object in parentheses so JS doesn't
        // read the object curly braces as the function block
        ({
            email: req.body.email,
            password: hash
        })
        )
        // create user with provided email and hashed password
        .then(user => User.create(user))
        // send the new user object back with status 201, but `hashedPassword`
        // won't be send because of the `transform` in the User model
        .then(user => res.status(201).json(user))
        //pass any errors along to the error handler
        .catch(next);
});

// SIGN IN
// POST /api/signin
router.post('/signin', (req, res, next) => {
    User.findOne({ email: req.body.email })
        //pass the user and the request to createUserToken
        .then((user) => createUserToken(req, user))
        // createUserToken will either throe an error that
        //will be caught by our error handler or send back
        //a token that we'll turn in send to the client
        .then((token) => res.json({ token }))
        .catch(next);
});


module.exports = router;