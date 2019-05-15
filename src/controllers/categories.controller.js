const mongoose        = require('mongoose');
const modelCategories = mongoose.model('categories')
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

apiCategories.listById = async (req, res) => {

    try {
        const { id } = req.params;
        await modelCategories.findOne({ _id: id }, (error, category) => {

            if (error) {
                console.log(error.message);
                res.status(400).json({ fail: error.message });
                return;
            };

            console.log('############# Categoria encontrada ###############');
            console.log(category);
            console.log('##################################################');
            res.status(200).json(category);
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    }
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

apiCategories.update = async (req, res) => {

    try {
        const { id } = req.params;
        const { name } = req.body;

        await modelCategories.findOneAndUpdate({ _id: id }, name, (error, category) => {

            if(error) {
                console.log(error.message);
                res.status(400).json({ fail: error.message });
                return;        
            };

            if(!name) {
                console.log('Campo name não foi informado');
                res.status(400).json({ fail: 'Campo name não foi informado' });
                return;        
            };

            category.set(req.body);
            category.save();

            console.log('############# Categoria alterada ###############');
            console.log(category);
            console.log('################################################');

            req.io.emit('category-edit');
            res.status(200).json(category);
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    }
};

apiCategories.remove = async (req, res) => {

    try {
        const { id } = req.params;
        await modelCategories.findOneAndDelete({ _id: id }, (error, category) => {

            if(error) {
                
                console.log(error.message);
                res.status(400).json({ fail: error.message });
                return;
            };

            console.log('############# Categoria removida ###############');
            console.log(category);
            console.log('################################################');

            req.io.emit('category-remove', category);
            res.status(200).json({ success: 'Categoria removida com sucesso' })
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message })
    }
};

module.exports = apiCategories