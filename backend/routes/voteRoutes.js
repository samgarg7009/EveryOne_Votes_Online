const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidates');
const User = require('../models/Users');


const auth = require('../middleware/auth')

router.use(auth)

router.post('/', async (req, res) => {
  const { aadharNumber, constituency, candidateId } = req.body;
  try {
    const candidate = await Candidate.findById(candidateId);
    const user = await User.findOne({aadharNumber, constituency});
    if(!user) {
      return res.status(404).json({message: 'Not a valid user'})
    }
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    const existingVote = candidate.votes.find(
      (vote) => vote.aadharNumber === aadharNumber && vote.constituency === constituency
    );
    if (existingVote) {
      return res.status(400).json({ message: 'Vote already exists for this Aadhar number and constituency' });
    }
    candidate.votes.push({ aadharNumber, constituency });
    await candidate.save();
    user.hasVoted = true;
    await user.save();
    res.status(200).json({ message: 'Vote added successfully', candidate, user});
    console.log("vote saved");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
