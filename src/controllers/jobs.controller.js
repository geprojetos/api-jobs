const jobsModel = require('../models/jobs.model');
let apiModel    = {};

apiModel.list = async (req, res) => {

    try {
        const jobs = await jobsModel.find({}).sort({ createdAt: -1 }).populate({
            path: 'idCategory',
            select: 'name'
        });

        if(jobs) {
            console.log('############# Vagas listadas ###############');
            res.status(200).json(jobs)
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message })
    }
};

module.exports = apiModel;