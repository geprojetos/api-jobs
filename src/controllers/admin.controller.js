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

module.exports = apiAdmin;