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
}

module.exports = apiAdmin;