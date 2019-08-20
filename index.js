const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

server.post('/projects', (req, res) => {
    const { title, tasks } = req.body
    const project = {
        id: projects.length,
        title,
        tasks
    };

    projects.push(project);

    return res.json(projects);
});


server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const projectIndex = projects.findIndex(p => p.id == id);

    projects[projectIndex] = req.body;

    return res.json(projects);
});

server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;
    const projectIndex = projects.findIndex(p => p.id == id);

    if (projectIndex == -1) {
        return res.status(404).send({ error: "Project not exist" });
    }

    projects.splice(projectIndex, 1);

    return res.send();
});

server.post('/projects/:id/tasks', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const project = projects.find(p => p.id == id);

    project.tasks.push(title);

    return res.json(project);
});

server.listen(3000);