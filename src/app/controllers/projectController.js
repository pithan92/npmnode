const express = require('express');

const Project = require('../models/projects');

const Task = require('../models/tasks');

const router = express.Router();

const authMiddleware = require('../../app/middlewares/auth.js');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate(['user', 'tasks']);

        return res.send({ projects });
    } catch (err) {
        return res.status(400).send({ erro: 'Erro loading projects' });
    }
});

router.get('/:projectId', async (req, res) => {

    try {
        const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);

        return res.send({ project });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ erro: 'Erro loading project' });
    }
});

router.post('/', async (req, res) => {

    try {

        const { title, descripition, tasks } = req.body;

        const project = await Project.create({ title, descripition, user: req.userId });
        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });
            await projectTask.save();
            project.tasks.push(projectTask);
        }));
        console.log(project);
        await project.save();

        return res.send({ project });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ erro: 'Erro creating new project' });
    }
});

router.put('/:projectId', async (req, res) => {

    try {

        const { title, descripition, tasks } = req.body;

        const project = await Project.findByIdAndUpdate(req.params.projectId, {
            title,
            descripition
        },{ new: true });
        project.tasks = [];
        await Task.remove({project: project._id});
        await Promise.all(tasks.map(async task => {
            const projectTask = new Task({ ...task, project: project._id });
            await projectTask.save();
            project.tasks.push(projectTask);
        }));
        console.log(project);
        await project.save();

        return res.send({ project });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ erro: 'Erro updating project' });
    }
});

router.delete('/:projectId', async (req, res) => {
    try {
        await Project.findByIdAndRemove(req.params.projectId).populate('user');
        return res.send();
    } catch (err) {
        console.log(err);
        return res.status(400).send({ erro: 'Erro deleteing project' });
    }
});


module.exports = app => app.use('/projects', router);