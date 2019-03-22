const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
server.use(express.json(), cors(), helmet());

//
const projectDB = require('./data/helpers/projectModel');
const actionDB = require('./data/helpers/actionModel');


server.get('/api/projects', (req, res) => {
  projectDB.get().then( projects => res.status(200).send(projects))
  .catch(err => res.status(500).json({ messege: `Cannot retrieve project list` }));
});

server.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projectDB.get(id).then(project => {
    !project ? res.status(404).json({ message: `No project with that id found` }) : res.status(200).json(project)
  .catch(() => res.status(500).json({ messege: `Could not retrieve project`}))
  });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  projectDB.remove(id).then(project => {
    res.status(200).json({ messege: `Project deleted `})})
    .catch(() => res.status(500).json({ messege: `Project could not be deleted` }))
  });

server.post('/api/projects', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) res.status(404).json({ messege: `must provide title & description` }); return;
  projectDB.insert(title, description).then(() => res.status(200).json({ messege: `project created`}))
  .catch(() => res.status(500).json({ messege: `could not create user` }))
});




const port = 4000;
 server.listen(port, () => console.log(`server rolling on port ${port}`));
