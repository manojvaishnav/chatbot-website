const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    website: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'USER',
        unique: true
    }
})

const company = new mongoose.model('COMPANY', companySchema)

module.exports = company