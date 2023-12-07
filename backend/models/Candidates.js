const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
    candidateName: {
        type: String,
        required: true
    },
    votes:{
        type: Array,
        required: true,
        default: () => [],
    }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema)