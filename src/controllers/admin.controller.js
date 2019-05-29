const mongoose      = require('mongoose');
const adminModel    = mongoose.model('admin');
const jwt           = require('jsonwebtoken');
const authSecret    = require('../config/auth.secret.json');
const bcrypt        = require('bcryptjs');
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
            res.status(400).json({ fail: error.message });
            return;
        };

        admin.password = undefined;
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
};

apiAdmin.update = async (req, res) => {

    try {
      const { id }   = req.params;
      const { login, email } = req.body;

      await adminModel.findOneAndUpdate({ _id: id }, req.body, (error, admin) => {

        if(error) {
            console.log(error.message);
            res.status(400).json({ fail: error.message });
            return;
        };

        if(login || email) {

            admin.set(req.body);
            admin.save();
    
            console.log('############# User alterado ###############');
            console.log(admin);
            console.log('############################################');
    
            req.io.emit('admin-update', admin);
            res.status(200).json(admin);
            return;
        }

        console.log('############# User com campo inválido ###############');
        res.status(400).json({ fail: 'O campo informado está inválido' });

      })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    };
};

apiAdmin.changePassword = async (req, res, next) => {

    const token = req.headers['x-access-token'];
    const { id } = req.params;
    let { password, newPassword, confirmNewPassword } = req.body;
    
    console.log('############# Endereço necessita de autenticação ###############');
 
    if(!token) {
        
        console.log('############# Token não informado ###############');
        res.status(400).json({ fail: 'Token não informado' });
        return;
    };

    const decoded = jwt.verify(token, authSecret.secret, (error, decoded) => {

        if(error) {

            console.log('Token inválido');
            console.log(error.message);
            res.status(400).json({ fail: 'Token inválido' });
            return;
        };

        if(id != decoded.id) {
            console.log('############# Acesso não permitido ###############');    
            res.status(400).json({ fail: 'Acesso não permitido' });
            return;
        };

        return decoded;
    });

    if(!decoded) return;

    if(!password) {
        console.log('############# password não informado ###############');    
        res.status(400).json({ fail: 'password não informado' });
        return;
    };

    if(!newPassword) {
        console.log('############# newPassword não informado ###############');    
        res.status(400).json({ fail: 'newPassword não informado' });
        return;
    };

    if(!confirmNewPassword) {
        console.log('############# confirmNewPassword não informado ###############');    
        res.status(400).json({ fail: 'confirmNewPassword não informado' });
        return;
    };

    try {  
        const admin = await adminModel.findOne({ _id: id }, (error) => {

            if(error) {
                console.log(error.message);
                res.status(400).json({ fail: error.message });
                return;
            };

        }).select(['login', 'password']);

        if(!await bcrypt.compare(password, admin.password)) {
            console.log('############# password informado não é válido ###############');        
            res.status(400).json({ fail: 'password informado não é válido' });
            return;
        };

        if(password == newPassword) {

            console.log('############# não pode usar a mesmo password ###############');
            res.status(400).json({ fail: 'não pode usar o mesmo password' });
            return;
        };

        if(newPassword != confirmNewPassword) {
            console.log('############# o newPassword não está igual ao confirmNewPassword  ###############');  
            res.status(400).json({ fail: 'o newPassword não está igual ao confirmNewPassword ' });
            return;
        };

        admin.password = newPassword;
        admin.save();

        console.log('############# password alterado ###############');
        res.status(200).json({ success: 'password alterado' });
    } catch (error) {

        console.log(error.message);
        res.status(400).json({ fail: error.message });
    };

    next();
};

apiAdmin.remove = async (req, res) => {

    try {
      const { id } = req.params;

      await adminModel.findOneAndRemove({ _id: id }, (error, admin) => {

        if(error) {
            console.log(error.message);
            res.status(400).json({ fail: error.message });
            return;    
        };

        console.log('############# User removido ###############');
        console.log(admin);
        console.log('############################################');

        req.io.emit('admin-removed', admin);
        res.status(200).json({ success: 'Usuário removido' });
      })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    };
};

module.exports = apiAdmin;