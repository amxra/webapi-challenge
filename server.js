const express = require('express');
const cors = require('cors');
const helmet = require('helmet')

const action = require('./action');
const project = require('./project');

const server = express()

server.use(helmet())
server.use(cors());
server.use(express.json())
server.use('/api/project', project)
server.use('/api/action', action)

server.get('/', (req,res) => {
    res.json('Hello World')
})

module.exports = server