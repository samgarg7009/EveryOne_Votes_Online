const express = require('express')
const router = express.Router()

const { getAllUsers, registerUser, loginUser, verifyUser } = require('../controllers/userController')

router.get('/getusers', getAllUsers)

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/verify', verifyUser)

module.exports = router