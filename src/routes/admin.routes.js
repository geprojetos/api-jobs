const adminController = require('../controllers/admin.controller');

module.exports = app => {

    app
        .route('/admin/users')
        .get(adminController.list)
        .post(adminController.add)

    app
        .route('/admin/user/:id')
        .get(adminController.listById)
        .put(adminController.update)
};