const mongoose = require('mongoose');

// Use a ternary that looks for the presence of a `NODE_ENV` environmental variable
// If `NODE_ENV` is set to `production`, use the URI for our database stored in the
// `MONGODB_URI` environmental variable.  If not, just use the local db address.
const mongoURI =
    process.env.NODE_ENV === 'production'
        ? process.env.MONGODB_URI
        : 'mongodb://localhost/job-board';

// Use Mongoose's connect method to connect to MongoDB by passing it the db URI.
// Pass a second argument which is an object with the options for the connection.
mongoose
    .connect(mongoURI)
    .then((instance) => {
        console.log(`Connected to db: ${instance.connections[0].name}`)
    })
    .catch((err) => console.log('Connection failed', err));

module.exports = mongoose;
