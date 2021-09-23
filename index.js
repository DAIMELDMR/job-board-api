const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//controllers
const jobController = require('./controllers/jobs')


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
app.use('/api/jobs', jobController);

// Define a port for API to run on, if the environment
// variable called `PORT` is not found use port 4000
app.set('port', process.env.PORT || 4000);
app.listen(
    app.get('port'), () => {
    console.log('Listening on port ' + app.get('port'))
    });