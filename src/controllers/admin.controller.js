const mongoose      = require('mongoose');
const adminModel    = mongoose.model('admin');
let apiAdmin        = {};

apiAdmin.list = async (req, res) => {

    try {
      const admins = await adminModel.find({}).sort({ createdAt: -1 });

      if(admins) {
        console.log('############# Users listadas ###############');
        res.status(200).json(admins);
      }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    };  
};

apiAdmin.listById = async (req, res) => {

    try {
        const { id } = req.params;

        await adminModel.findOne({ _id: id}, (error, admin) => {

            if(error) {
                console.log(error.message);
                res.status(400).json({ fail: error.message });
                return;
            }

            console.log('############# User encontrado ###############');
            console.log(admin);
            console.log('#############################################');

            res.status(200).json(admin);
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    }
};

apiAdmin.add = async (req, res) => {

    try {
      const { login, email, password } = req.body;
      await adminModel.create({ login, email, password }, (error, admin) => {

        if(error) {
            console.log(error.message);
            
            if(error.errors.login) {
                console.log(error.errors.login.message);
                res.status(400).json({ fail: error.errors.login.message });
                return
            };

            if(error.errors.email) {
                console.log(error.errors.email.message);
                res.status(400).json({ fail: error.errors.email.message });
                return
            };

            if(error.errors.password) {
                console.log(error.errors.password.message);
                res.status(400).json({ fail: error.errors.password.message });
                return
            };
        };

        console.log('############# User criado ###############');
        console.log(admin);
        console.log('#########################################');
        
        req.io.emit('admin-add', admin);
        res.status(200).json(admin);
      })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    };
}

module.exports = apiAdmin;