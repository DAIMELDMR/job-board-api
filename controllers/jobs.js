const express = require('express');
const Job = require('../models/Job')

const route = express.Router();

// Require handleValidateId by destructuring it from the exports object
const { handleValidateId, handleRecordExists, handleValidateOwnership } = require('../middleware/custom_errors');
const {requireToken} = require('../middleware/auth')

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
route.post('/', requireToken, (req, res, next) => {
    Job.create({ ...req.body, owner: req.user._id })
        .then((jobs) => res.status(201).json(jobs))
        .catch(next)
});


// UPDATE
// PUT api/jobs/5a7db6c74d55bc51bdf39793
route.put('/:id', handleValidateId, requireToken, (req, res, next) => {
    Job.findById(req.params.id)
        .then(handleRecordExists)
        .then((job) => handleValidateOwnership(req, job))
        .then((job) => job.set(req.body).save())
        .then((job) => {res.json(job)})
        .catch(next);
});

// DESTROY
// DELETE api/jobs/5a7db6c74d55bc51bdf39793
route.delete('/:id', handleValidateId, (req, res, next) => {
    Job.findById(req.params.id)
        .then(handleRecordExists)
        .then((job) => handleValidateOwnership(req, job))
        .then((job) => job.remove())
        .then(() => { res.sendStatus(204) })
        .catch(next);
});


module.exports = route;