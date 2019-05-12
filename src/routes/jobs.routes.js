const jobsController = require('../controllers/jobs.controller');

module.exports = app => {

    app
        .route('/jobs')
        .get(jobsController.list)
        .post(jobsController.add)

    app
        .route('/job/:id')
        .get(jobsController.listById)
        .put(jobsController.update)
};