const mongoose  = require('mongoose');
const jobsModel = mongoose.model('jobs');
let apiJobs     = {};

apiJobs.list = async (req, res) => {

    try {
        // const jobs = await jobsModel
        //                 .find({})
        //                 .sort({ createdAt: -1 })
        //                 .populate({
        //                     path: 'idCategory',
        //                     select: 'name'
        //                 });

        const { page = 1 } = req.query;
        const jobs = await jobsModel.paginate(
            {},
            { 
                sort: { createdAt: -1 },
                populate: {
                    path: 'idCategory',
                    select: 'name'
                },
                page, limit: 10
            },
            
        )

        if(jobs) {
            console.log('############# Vagas listadas ###############');
            res.status(200).json(jobs)
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message })
    }
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
        }).populate({
            path: 'idCategory',
            select: 'name'
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    }
};

apiJobs.add = async (req, res) => {

    
    try {
        const { title, description, idCategory } = req.body;

        await jobsModel.create({title, description, idCategory}, (error, job) => {

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

                if(error.errors.idCategory) {
                    console.log(error.errors.idCategory.message);
                    res.status(400).json({ fail: error.errors.idCategory.message });
                    return;
                };
            };

            console.log('############# Vaga criada ###############');
            console.log(job);
            console.log('#########################################');
            req.io.emit('job-new', job);
            res.status(200).json(job);
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    };
    
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
            req.io.emit('job-modify', job);
            res.status(200).json(job);
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    };
};

apiJobs.remove = async (req, res) => {

    try {
        const { id } = req.params;
        await jobsModel.findOneAndDelete({ _id: id }, (error, job) => {

            if(error) {
                console.log(error.message);
                res.status(400).json({ fail: error.message });
                return;
            };

            console.log('############# Vaga removida ###############');
            console.log(job);
            console.log('###########################################');
            
            req.io.emit('job-removed', job);
            res.status(200).json({ success: 'Vaga removida com sucesso' });
        })
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ fail: error.message });
    };
};

module.exports = apiJobs;