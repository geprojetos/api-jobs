const modelCategories = require('../models/categories.model');
let apiCategories     = {};

apiCategories.list = async (req, res) => {

    try {
      const categories = await modelCategories.find({}).sort({ createdAt: -1 });

      if(categories) {
        console.log('############# Categorias listadas ###############');
        res.status(200).json(categories);
      };
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    };
}

module.exports = apiCategories