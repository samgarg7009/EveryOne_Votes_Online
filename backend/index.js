require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

const userRoutes = require('./routes/userRoutes')
const candidateRoutes = require('./routes/candidateRoutes')
const voteRoutes = require('./routes/voteRoutes')
const adminRoutes = require('./routes/adminRoutes')


const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Server Index")
});


app.use('/api/users', userRoutes)

app.use('/api/candidates', candidateRoutes)

app.use('/api/vote', voteRoutes)

app.use('/api/admin', adminRoutes)

mongoose.connect(process.env.DATABASE_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    .catch((err) => {
        console.log(`Error encountered ${err}`)
    })