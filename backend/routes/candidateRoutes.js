const express = require('express')
const Candidates = require('../models/Candidates')
const router = express.Router()
const auth = require('../middleware/auth')


router.get('/get', async(req, res) => {
    try{
        const candidates = await Candidates.find({});
        res.status(200).json({candidates})
    } catch(err) {
        console.log(err)
        res.status(400).json({Message: "Error fetching candidates"})
    }
})

router.post('/create', async(req, res) => {
    const { candidateName } = req.body 
    try{
        const candidate = await Candidates.create({candidateName})
        res.status(200).json({Message: `Candidate created successfully: ${candidate._id}`})
    } catch(err) {
        console.log(err)
        res.status(400).json({Message: "Error creating candidates"})
    }
})

module.exports = router