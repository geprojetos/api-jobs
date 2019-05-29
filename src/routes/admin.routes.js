const adminController = require('../controllers/admin.controller');
const loginController = require('../controllers/login.controller');

module.exports = app => {

    app
        .route('/admin/users')
        .get(adminController.list)
        .post(adminController.add)

    app
        .route('/admin/user/:id')
        .get(adminController.listById)
        .put(loginController.requiredToken, adminController.update)
        .delete(loginController.requiredToken, adminController.remove)

    app
        .route('/admin/user/changepassword/:id')
        .put(adminController.changePassword)
};