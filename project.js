const express = require('express');
const db = require('./data/helpers/projectModel')

const router = express.Router()

router.get('/', (req, res) => {
    db.get()
    .then(project =>{
        if(project){
            res.status(200).json(project)
        }
        else{
            res.status(404).json({
                message: "The project does not exist"
            })
        }
    })
    .catch(() => {
        res.status(500).json({
            error: "The project information could not be retrieved"
        })
    })
})

router.post('/', (req, res) => {
    
    const project = req.body

    if(!project.name || !project.description){
        res.status(400).json({
            error: 'Please provide name and description'
        })
    }
    else{
        project.inser(project)
        .then(pro => {
            res.status(200).json(pro)
        })
        .catch(() => {
            res.status(500).json({
                error: 'Internal error'
            })
        })
    }
})


