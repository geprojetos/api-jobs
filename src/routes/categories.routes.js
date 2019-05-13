const categoriesController = require('../controllers/categories.controller');

module.exports = app => {

    app
        .route('/categories')
        .get(categoriesController.list)
        .post(categoriesController.add)

    app
        .route('/categories/:id')
        .get(categoriesController.listById)
        .put(categoriesController.update)
        .delete(categoriesController.remove)
};