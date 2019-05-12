const jobsModel = require('../models/jobs.model');
let apiJobs    = {};

apiJobs.list = async (req, res) => {

    try {
        const jobs = await jobsModel
                        .find({})
                        .sort({ createdAt: -1 })
                        // .populate({
                        //     path: 'idCategory',
                        //     select: 'name'
                        // });

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

    
    try {
        const { title, description } = req.body;

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
    
};

apiJobs.listById = async (req, res) => {

    try {
        const { id } = req.params;
        await jobsModel.findOne({ _id: id }, (error, job) => {

            if(error) {
                console.log(error.message);
                res.status(400).json({ fail: error.message });
                return;
            };

            console.log('############# Vaga encontrada ###############');
            console.log(job);
            console.log('#############################################');
            res.status(200).json(job);
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    }
};

apiJobs.update = async (req, res) => {

    try {
        const { id } = req.params;
        await jobsModel.findOneAndUpdate({_id: id}, req.body, (error, job) => {

            if(error) {
                console.log(error.message);
                res.status(400).json({ fail: error.message });
                return;
            };

            job.set(req.body);
            job.save();
            console.log('############# Vaga alterada ###############');
            console.log(job);
            console.log('###########################################');
            res.status(200).json(job);
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    };
};

module.exports = apiJobs;