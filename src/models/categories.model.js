const mongoose = require('mongoose');
const categories = new mongoose.Schema({

    name: {
        required: true,
        type: String
    }
},
{
    timestamps: true
});

mongoose.model('categories', categories);