const mongoose = require('../db/connections');

const JobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamp: true,
    }
);

module.exports = mongoose.model('Job', JobSchema);