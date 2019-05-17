const categoriesController = require('../controllers/categories.controller');
const loginController      = require('../controllers/login.controller');

module.exports = app => {

    app
        .route('/categories')
        .get(categoriesController.list)
        .post(loginController.requiredToken, categoriesController.add)

    app
        .route('/categories/:id')
        .get(categoriesController.listById)
        .put(loginController.requiredToken, categoriesController.update)
        .delete(loginController.requiredToken, categoriesController.remove)
};