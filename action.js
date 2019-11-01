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