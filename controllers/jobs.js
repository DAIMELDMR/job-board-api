const express = require('express');
const Job = require('../models/Job')

const route = express.Router();

// INDEX
// GET api/jobs
route.get('/', (req, res, next) => {
    Job.find()
        .then((jobs) => res.json(jobs))
    .catch(next)
});

// SHOW
// GET api/jobs/5a7db6c74d55bc51bdf39793
route.get('/:id', (req, res, next) => {
    Job.findById(req.params.id)
        .then(job => {
            // If we didn't get a job back from the query
            if (!job) {
                // send a 404
                res.sendStatus(404);
            } else {
                // otherwise, send back the job
                res.json(job);
            }
        })
        .catch(next);
});

// CREATE
// POST api/jobs
route.post('/', (req, res, next) => {
    Job.create(req.body)
        .then((jobs) => res.json(jobs))
        .catch(next)
});


// UPDATE
// PUT api/jobs/5a7db6c74d55bc51bdf39793
route.put('/:id', (req, res, next) => {
    Job.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(job => {
            // If we didn't get a job back from the query
            if (!job) {
                // send a 404
                res.sendStatus(404);
            } else {
                // otherwise, send back the job
                res.json(job);
            }
        })
        .catch(next);
});

// DESTROY
// DELETE api/jobs/5a7db6c74d55bc51bdf39793
route.delete('/:id', (req, res, next) => {
    Job.findOneAndDelete({ _id: req.params.id })
        .then(job => {
            // If we didn't get a job back from the query
            if (!job) {
                // send a 404
                res.sendStatus(404);
            } else {
                // otherwise, send back 204 No Content
                res.sendStatus(204);
            }
        })
        .catch(next);
});


module.exports = route;