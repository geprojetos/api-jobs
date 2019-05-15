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
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'categories'
    }
},
{
    timestamps: true
});

mongoose.model('jobs', jobs);