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
  projectsDB.remove(id).then(() => res.json({ message: "Project deleted from database." }))
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
////////////////////////////////////////////////////////////////

// Action Endpoints


server.get('/api/actions', (req, res) => {
    actionsDB.get()
    .then(actions => res.status(200).send(actions))
    .catch(() => res.status(500).json({ error: `Could not retrieve actions`}))
});


server.get('/api/actions/:actionId', (req, res) => {
    const actionId = req.params.actionId;
    actionsDB.get(actionId).then( action => {
      if ( !action ) {
            return res.status(404).json({ error: `No action with that ID found` })
        }
        res.status(200).send(action)
    })
    .catch(() => res.status(500).json({ error: `Could not retrieve action` }))
});

server.post('/api/projects/:projectId/actions', (req, res) => {
    const projectId = req.params.projectId;
    let { description, notes, completed } = req.body;
    if ( !description || !notes) {
        return res.status(400).json({ error: `Could not create action` })
    }
    if ( !completed ) {
        completed = false;
    }
    projectsDB.get(projectId).then( project => {
        if ( !project ) {
            return res.status(404).send({ error: `project id required `})
        }
        const newAction = { "project_id": projectId, "description": description, "notes": notes, "completed": completed };
        actionsDB.insert(newAction)
        .then(action => res.status(201).send(action))
        .catch(() => res.status(500).json({ messege: `Could not complete action` }))
    })
    .catch(() => res.status(500).json({ messege: `Could not complete action` }))
})

server.get('/api/projects/:projectId/actions', (req, res) => {
    const projectId = req.params.projectId;
    projectsDB.getProjectActions(projectId)
    .then( actions => {
        if ( !actions ) {
            return res.status(404).json({ error: `No actions found` })
        }
        res.status(200).send(actions)
    })
    .catch(() => res.status(500).json({ error: `Could not complete action`}))
});

server.put('/api/actions/:actionId', (req, res) => {
    const actionId = req.params.actionId;
    let { description, notes, completed } = req.body;
    let updatedAction = {};
    if ( description ) {
        updatedAction.description = description;
    }
    if ( notes ) {
        updatedAction.notes = notes;
    }
    if ( completed ) {
        updatedAction.completed = completed;
    }
    actionsDB.update(actionId, updatedAction)
    .then( action => {
        if ( !action ) {
            return res.status(404).json({ error: `need projectID`})
        }
        res.status(200).send(action);
    })
    .catch(() => res.status(500).json({ error: `Could not find action` }))
});

server.delete('/api/actions/:actionId',  (req, res) => {
    const actionId = req.params.actionId;
     actionsDB.get(actionId)
    .then( action => {
        if ( !action ) {
            return res.status(404).json({ error: `need action idea`})
        }
         actionsDB.remove(actionId)
        .then( wasDeleted => {
            if ( !wasDeleted ) {
                return res.status(204).send(noDelete);
            }
            res.status(200).send(action);
        })
        .catch(() => res.status(500).json({ messege: `Could not delete` }))
    })
    .catch(() => res.status(500).json({ messege: `Could not delete` }))
});

const port = 4000;
server.listen(port, () => console.log(`server rolling on port ${port}`));
