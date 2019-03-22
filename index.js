const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
server.use(express.json(), cors(), helmet());

const projectsDB = require('./data/helpers/projectModel');
const actionsDB = require('./data/helpers/actionModel');


server.get('/api/projects', (req, res) => {
 projectsDB.get().then((projects) => res.status(200).json(projects))
  .catch(() => {res.status(500).json({ error: "Could retrieve projects" })
  });
});

server.get('/api/projects/:id', (req, res) => {
 const { id } = req.params
 projectsDB.get(id).then(project => res.json(project))
  .catch(() => {res.status(500).json({ error: "Could not find Project with that ID" })
  });
});

server.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projectsDB.remove(id).then(() => res.json({message: "Project deleted from database."))
  .catch(() => res.status(500).json({error: "Error deleting project from database."}))
});

server.post('/api/projects', (req, res) => {
 const { name, description, completed } = req.body;
  if (name, description, completed) {
    projectsDB.insert({ name, description, completed })
    .then(({name, description, completed}) => res.status(200).json({name, description, completed}))
  } else {
   res.status(500).json({error: "Error adding project to database."})
 };
});


server.put('/api/projects/:id', (req, res) => {
 const { id } = req.params;
 const {name, description, completed} = req.body;
 if (name, description, completed && id) {
  projectsDB.update(id, req.body).then(() => res.json({ message: "Project info updated" }))
 } else {
  res.catch(() => res.status(500).json({ error: "Error updating projects." }))
 }
});




const port = 4000;
server.listen(port, () => console.log(`server rolling on port ${port}`));































//
//
// // server.post('/api/projects', (req, res) => {
// //   const { name, description } = req.body;
// //   if (!name || !description) return res.status(404).json({ messege: `must provide title & description` });
// //   projectDB.insert(name, description).then(() => res.status(200).json({ messege: `project created` }))
// //   .catch(() => res.status(500).json({ messege: `could not create user` }))
// // });
//
//
//
//
