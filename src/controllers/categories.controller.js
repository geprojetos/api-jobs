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
};

apiCategories.add = async (req, res) => {

    try {
        const { name } = req.body;
        await modelCategories.create({ name }, (error, category) => {

            if(error) {
                console.log(error.message);
                res.status(400).json({ fail: error.message });
                return;        
            }

            console.log('############# Categoria cadastrada ###############');
            console.log(category);
            console.log('##################################################');
            req.io.emit('category-new', category);
            res.status(200).json(category)
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    };
};

module.exports = apiCategories