const jobsController = require('../controllers/jobs.controller');

module.exports = app => {

    app
        .route('/jobs')
        .get(jobsController.list)
};