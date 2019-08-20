const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let numberOfRequests = 0;

function checkProjectExists(req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);

    if (!project) {
        return res.status(400).json({ error: 'Project not found' });
    }

    return next();
}

function logRequests(req, res, next) {
    numberOfRequests++;
  
    console.log(`Número de requisições: ${numberOfRequests}`);
  
    return next();
}
  
  server.use(logRequests);

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

server.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const projectIndex = projects.findIndex(p => p.id == id);

    projects[projectIndex] = req.body;

    return res.json(projects);
});

server.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const projectIndex = projects.findIndex(p => p.id == id);

    if (projectIndex == -1) {
        return res.status(404).send({ error: "Project not exist" });
    }

    projects.splice(projectIndex, 1);

    return res.send();
});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const project = projects.find(p => p.id == id);

    project.tasks.push(title);

    return res.json(project);
});

server.listen(3000);