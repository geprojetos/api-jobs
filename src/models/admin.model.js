const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
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
        type: String,
        select: false
    }
},
{
    timestamps: true
});

admin.pre('save', async function(next) {
    
    const hash = await bcryptjs.hash(this.password, 10);

    this.password = hash;
    next();
});

mongoose.model('admin', admin);