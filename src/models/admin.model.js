const mongoose = require('mongoose');
const admin    = new mongoose.Schema({

    login: {
        required: true,
        type: String,
        unique: true
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
},
{
    timestamps: true
})

mongoose.model('admin', admin);