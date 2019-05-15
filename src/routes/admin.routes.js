const adminController = require('../controllers/admin.controller');

module.exports = app => {

    app
        .route('/admin/users')
        .get(adminController.list)
};