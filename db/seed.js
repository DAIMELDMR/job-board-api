const Job = require('../models/Job');
const seeData = require('./seed.json');


Job.deleteMany()
    .then(() => Job.insertMany(seeData))
    .then(console.log)
    .catch(console.error)
    .finally(process.exit);
