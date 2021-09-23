const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


//require the error handler
const { handleErrors, handleValidationErrors } = require('./middleware/custom_errors')

//controllers
const jobController = require('./controllers/jobs')
const userController = require('./controllers/users')


//initiate express application
const app = express();

app.use(cors());

// Add `express.json` middleware which will
// parse JSON requests into JS objects before
// they reach the route files.
app.use(express.json());

// The urlencoded middleware parses requests which use
// a specific content type (such as when using Axios)
app.use(express.urlencoded({ extended: true }));

//route middleware
app.use('/api', userController);
app.use('/api/jobs', jobController);

app.use(handleValidationErrors);
// The catch all for handling errors
// MUST BE PLACED IMMEDIATELY BEFORE `app.listen`
app.use(handleErrors);

// Define a port for API to run on, if the environment
// variable called `PORT` is not found use port 4000
app.set('port', process.env.PORT || 4000);
app.listen(
    app.get('port'), () => {
    console.log('Listening on port ' + app.get('port'))
    });