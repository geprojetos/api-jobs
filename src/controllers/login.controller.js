const mongoose  = require('mongoose');
const adminModel= mongoose.model('admin');
let apiLogin    = {};

apiLogin.login = async (req, res) => {

    try {
        const { login, password } = req.body;

        await adminModel.findOne({ login, password }, (error, user) => {

            if(error) {
                console.log(error.message);
                res.status(400).json(error.message);
                return
            };

            if(!login) {
                console.log('login não informado');
                res.status(400).json({ fail: 'login não informado' });
                return;
            };

            if(!password) {
                console.log('password não informado');
                res.status(400).json({ fail: 'password não informado' });
                return;
            };

            if(user) {
                console.log('############# Logado ###############');
                console.log(user);
                console.log('####################################');
                res.status(200).json(user);
                return;
            } else {
                console.log('login ou password inválidos');
                res.status(400).json({fail: 'login ou password inválidos'});
            };
        })      
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message })
    };
};


module.exports = apiLogin;