const express = require('express');
const db = require('./data/helpers/actionModel')

const router = express.Router()


router.get('/', (req,res) => {
    db.get()
    .then(action => {
        if(action){
            res.status(200).json(action)
        }
        else{
            res.status(404).json({
                message: 'Action cannot be executed'
            })
        }
    })
    .catch(() => {
        res.status(500).json({
            error: 'The action could not be found'
        })
    })
})


router.get('/:id', [validActionId], (req,res) => {
    res.status(200).json(req.action)
})

router.post('/', [validActionBody], (req,res) => {
    const action = req.body;

    db.insert(action)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => {
            res.status(500).json({
                error: `There was an error while saving the action to the database ${err}`
            })
        })

})

router.put('/:id', [validActionId,validActionBody], (req,res) => {
    const id = req.params.id;
    const action = req.body;

    db.update(id,action)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({
                error: `There was an error while saving the action to the database ${err}`
            })
        })

})

router.delete('/:id', [validActionId], (req,res) => {
    const id = req.params.id;

    db.remove(id)
        .then(response => {
            res.status(200).json({
                message: `${response} action deleted`
            })
        })
        .catch(err => {
            res.status(500).json({
                error: `There was an error while deleting the action from the database ${err}`
            })
        })
})

// Middleware

function validActionId (req,res,next){
    const id = req.params.id;

    db.get(id)
        .then(action => {
            if(action){
                req.action = action
                next()
            }
            else {
                res.status(400).json({
                    message: 'invalid action id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: `Action information could not be retrieved ${err}`
            })
        })
}

function validActionBody(req,res,next){
    if(Object.keys(req.body).length > 0){
        if(req.body.project_id && req.body.description && req.body.notes){
            next();
        } else {
            res.status(400).json({
                message: "missing required name, description, or notes field"
            })
        }
    } else {
        res.status(400).json({
            message: "missing action data"
        })
    }
}


module.exports = router;