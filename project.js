const express = require('express');
const db = require('./data/helpers/projectModel')

const router = express.Router()

router.get('/', (req,res) => {
    db.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({
                error: `Project information could not be retrieved ${err}`
            })
        })
})

router.get('/:id', [validateProjectID], (req,res) => {
    res.status(200).json(req.project)
})

router.get('/:id/actions', [validateProjectID], (req,res) => {
    const id = req.params.id;

    db.getProjectActions(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: `Project Actions information could not be retrieved ${err}`
            })
        })
})

router.post('/', [validateProjectBody],(req,res) => {
    const project = req.body;
    db.insert(project)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: `There was an error while saving the post to the database ${err}`
            })
        })
})

router.put('/:id', [validateProjectID], (req,res) => {
    const id = req.params.id;
    const project = req.body;

    db.update(id,project)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: `There was an error while saving the post to the database ${err}`
            })
        })
})

router.delete('/:id', [validateProjectID], (req,res) => {
    const id = req.params.id;

    db.remove(id)
        .then(response => {
            res.status(200).json({
                message: `${response} project deleted`
            })
        })
        .catch(err => {
            res.status(500).json({
                error: `There was an error while deleting the post from the database ${err}`
            })
        })
})

// Middleware

function validateProjectID (req,res,next){
    const id = req.params.id;

    db.get(id)
        .then(project => {
            if(project){
                req.project = project
                next()
            }
            else {
                res.status(400).json({
                    message: 'invalid post id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Project information could not be retrieved ${err}`
            })
        })
}

function validateProjectBody(req,res,next){
    if(Object.keys(req.body).length > 0){
        if(req.body.name && req.body.description){
            next();
        } else {
            res.status(400).json({
                message: "missing required name or description field"
            })
        }
    } else {
        res.status(400).json({
            message: "missing project data"
        })
    }
}

module.exports = router
//do enpoint for getProjectActions()