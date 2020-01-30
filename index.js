const express = require('express')

const server = express()

server.use(express.json())

const projects = []
counter = 0

function checkIdExists(req, res, next) {
   const item = projects.find(index => index.id === req.params.id)
   if (!item) {
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
   unique = projects.find(index => index.id === id)
   if (unique) {
      return res.status(400).json({ Error: 'Use another ID to register a Project' })
   }
   projects.push({ id, title, tasks:[] })

   return res.json(projects)
})

server.get('/projects', (req, res) => {
   return res.json(projects)
})

server.put('/projects/:id', checkIdExists, (req, res) => {
   const update = projects.find(index => index.id === req.params.id)
   update.title = req.body.title

   return res.json(projects)
})

server.delete('/projects/:id', checkIdExists, (req, res) => {
   const del = projects.findIndex(index => index.id === req.params.id)
   projects.splice(del, 1)

   return res.json(projects)
})

server.post("/projects/:id/tasks", (req, res) => {
   const update = projects.find(index => index.id === req.params.id)
   update.tasks.push(req.body.title)

   return res.json(projects)
});

server.listen(3000)