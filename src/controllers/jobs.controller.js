const jobsModel = require('../models/jobs.model');
let apiJobs    = {};

apiJobs.list = async (req, res) => {

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

apiJobs.add = async (req, res) => {

    const { title, description } = req.body;
    
    try {
        await jobsModel.create({title, description}, (error, job) => {

            if(error) {
                console.log(error.message);
                
                if(error.errors.title) {
                    console.log(error.errors.title.message);
                    res.status(400).json({ fail: error.errors.title.message });
                    return;
                };
    
                if(error.errors.description) {
                    console.log(error.errors.description.message);
                    res.status(400).json({ fail: error.errors.description.message });
                    return;
                };
            };

            console.log('############# Vaga criada ###############');
            console.log(job);
            console.log('#########################################');
            res.status(200).json(job);
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    };
    
}

module.exports = apiJobs;