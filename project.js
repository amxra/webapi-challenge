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


router.put(':/id', (req, res) => {
    const id = req.params.id
    const project = req.body

    if(project.name && project.description){
        db.update(id, project)
        .then(data => {
            if(data){
                db.findById(id).then(updatedProject => {
                    res.status(200).json(updatedProject[0])
                })
            }
            else{
                res.status(404).json({
                    message: 'Project with ID cannot be found'
                })
            }
        })

        .catch(() => {
            res.status(500).json({
                erroe: 'Error saving post'
            })
        })
    }
    else{
        res.status(400).json({
            errorMessage: 'Please provide the name and description of project'
        })
    }
})

router.delete('/:id', (res, req) => {
    const id = req.params.id;

    db.remove(id)
    .then(data => {
        if(data){
            res.status(200).json({
                message: "Project deleted"
            })
        }
        else{
            res.status(404).json({
                message: 'Post with ID does not exist'
            })
        }
    })
    .catch(() => {
        res.status(500).json({
            error: 'The post could not be deleted'
        })
    })
})

//do enpoint for getProjectActions()