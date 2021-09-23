const express = require('express');
const Job = require('../models/Job')

const route = express.Router();

// Require handleValidateId by destructuring it from the exports object
const { handleValidateId, handleRecordExists } = require('../middleware/custom_errors');


// INDEX
// GET api/jobs
route.get('/', handleValidateId, (req, res, next) => {
    Job.find()
        .populate('owner', 'email -_id')
        .then((jobs) => res.json(jobs))
        .catch(next)
});

// SHOW
// GET api/jobs/5a7db6c74d55bc51bdf39793
route.get('/:id', handleValidateId, (req, res, next) => {
    Job.findById(req.params.id)
        .populate('owner')
        .then(handleRecordExists)
        .then((job) => { res.json(job) })
        .catch(next);
});

// CREATE
// POST api/jobs
route.post('/', (req, res, next) => {
    Job.create(req.body)
        .then((jobs) => res.status(201).json(jobs))
        .catch(next)
});


// UPDATE
// PUT api/jobs/5a7db6c74d55bc51bdf39793
route.put('/:id', handleValidateId, (req, res, next) => {
    Job.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(handleRecordExists)
        .then((job) => { res.json(job) })
        .catch(next);
});

// DESTROY
// DELETE api/jobs/5a7db6c74d55bc51bdf39793
route.delete('/:id', handleValidateId, (req, res, next) => {
    Job.findOneAndDelete({ _id: req.params.id })
        .then(handleRecordExists)
        .then((job) => { res.sendStatus(204) })
        .catch(next);
});


module.exports = route;