const mongoose = require('../db/connections');

const JobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
    },
    {
        timestamp: true,
    }
);

module.exports = mongoose.model('Job', JobSchema);