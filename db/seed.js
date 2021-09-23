const User = require('../models/User')
const Job = require('../models/Job');
const seeData = require('./seed.json');

const getUser = async () => {
    try {
        if (!process.argv[2]) {
            throw new Error('To seed the database provide an email address for a existing user');
        }
        const user = await User.findOne({ email: process.argv[2] });
        if (!user) {
            throw new Error('No matching user found');
        }
        return user;
    }
    catch (err) {
        console.log(err);
    }
};

Job.deleteMany()
    .then(getUser)
    .then((user) => {
        const seeDataWithOwner = seeData.map((job) => {
            job.owner = user._id;
            return job;
        });
        return Job.insertMany(seeDataWithOwner);
    })
    .then(console.log)
    .catch(console.error)
    .finally(() => {
        process.exit();
    });
