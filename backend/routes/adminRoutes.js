const express = require('express')
const router = express.Router()
const User = require('../models/Users')

router.get('/registered-area', async (req, res) => {
    const { area } = req.body
    try {
        const allUsers = await User.find({ constituency: area })
        const votedUsers = await User.find({ constituency: area, hasVoted: true })

        const pendingUsers = allUsers.length - votedUsers.length;
        
        const responseData = {
            allUsersCount: allUsers.length,
            votedUsersCount: votedUsers.length,
            pendingUsersCount: pendingUsers,
        };

        res.status(200).json(responseData);
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Error fetching!' })
    }
})

module.exports = router