const jobsController = require('../controllers/jobs.controller');
const loginController= require('../controllers/login.controller');

module.exports = app => {

    app
        .route('/jobs')
        .get(jobsController.list)
        .post(loginController.requiredToken, jobsController.add)

    app
        .route('/job/:id')
        .get(jobsController.listById)
        .put(loginController.requiredToken, jobsController.update)
        .delete(loginController.requiredToken, jobsController.remove)
};