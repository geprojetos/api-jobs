const mongoose  = require('mongoose');
const jobs      = mongoose.Schema({

    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    idCategory: {
        type: mongoose.Schema.Types.ObjectId, ref: 'categories'
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('jobs', jobs);