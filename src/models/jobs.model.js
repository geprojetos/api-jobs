const mongoose  = require('mongoose');
const paginate  = require('mongoose-paginate');
const jobs      = new mongoose.Schema({

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

jobs.plugin(paginate);

mongoose.model('jobs', jobs);