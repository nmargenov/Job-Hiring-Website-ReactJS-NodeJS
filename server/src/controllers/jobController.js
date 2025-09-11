const { createJob, getAllActiveJobs, archiveJob, editJob, getJob } = require('../managers/jobManager');
const { mustBeAuth } = require('../middlewares/authMiddleware');
const { MustBeSetup } = require('../middlewares/isSetupMiddleware');
const { formatErrorMessage } = require('../utils/errorMessage');

const router = require('express').Router();

const { PATHS } = require('../utils/paths');

router.post('/', mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const title = req.body?.title?.trim();
        const description = req.body?.description?.trim();
        const salary = req.body?.salary?.trim();
        const location = req.body?.location?.trim();
        const experience = req.body?.experience?.trim();
        const job = await createJob(userID, title, description, salary, location, experience);
        res.status(200).json(job);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.get("/", async (req, res) => {
    try {
        const jobs = await getAllActiveJobs();
        res.status(200).json(jobs);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.get(PATHS.jobID, async (req, res) => {
    try {
        const jobID = req.params.jobID;
        const job = await getJob(jobID);
        res.status(200).json(job);
    } catch (err) {
        const error = formatErrorMessage(err);
        console.log(err);
        res.status(400).send({ message: error });
    }
})

router.post(PATHS.archiveJob, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const jobID = req.params.jobID?.trim();
        const job = await archiveJob(userID, jobID);
        res.status(200).json(job);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

router.patch(PATHS.jobID, mustBeAuth, MustBeSetup, async (req, res) => {
    try {
        const userID = req.user._id;
        const jobID = req.params?.jobID?.trim();
        const title = req.body?.title?.trim();
        const description = req.body?.description?.trim();
        const salary = req.body?.salary?.trim();
        const location = req.body?.location?.trim();
        const experience = req.body?.experience?.trim();
        const job = await editJob(userID, jobID, title, description, salary, location, experience);
        res.status(200).json(job);
    } catch (err) {
        const error = formatErrorMessage(err);
        res.status(400).send({ message: error });
    }
});

module.exports = router;