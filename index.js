const express = require('express')
const server = express()

server.use(express.json())

const projects = []
counter = 0

function checkIdExists(req, res, next) {
   const project = projects.find(index => index.id === req.params.id)
   if (!project) {
      return res.status(400).json({ Error: 'ID does not exists' })
   }

   return next()
}

function countRequests(req, res, next) {
   console.log(`Total de Requisições: ${++counter}`)

   return next()
}

server.use(countRequests)

server.post('/projects', (req, res) => {
   const { id, title } = req.body
   project = projects.find(index => index.id === id)
   if (project) {
      return res.status(400).json({ Error: 'Use another ID to register a Project' })
   }
   projects.push({ id, title, tasks:[] })

   return res.json(projects)
})

server.get('/projects', (req, res) => {
   return res.json(projects)
})

server.put('/projects/:id', checkIdExists, (req, res) => {
   const project = projects.find(index => index.id === req.params.id)
   project.title = req.body.title

   return res.json(projects)
})

server.delete('/projects/:id', checkIdExists, (req, res) => {
   const project = projects.findIndex(index => index.id === req.params.id)
   projects.splice(project, 1)

   return res.json(projects)
})

server.post("/projects/:id/tasks", checkIdExists, (req, res) => {
   const project = projects.find(index => index.id === req.params.id)
   const compare = project.tasks.indexOf(req.body.title, 0)
   if (compare !== -1) {
      return res.status(400).json({ Error: 'Task already exists' })
   }
   project.tasks.push(req.body.title)

   return res.json(projects)
});
//Feature nova - deletar tasks
server.delete("/projects/:id/tasks", (req, res) => {
   const project = projects.find(index => index.id === req.params.id)
   const index = project.tasks.indexOf(req.body.title, 0)
   project.tasks.splice(index, 1)

   return res.json(projects)
})

server.listen(3000)