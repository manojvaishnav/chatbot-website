const mongoose = require('mongoose')

const chatBotSchema = new mongoose.Schema({
    data: [
        {
            utterance: { type: String },
            answer: { type: String },
            intent: { type: String }
        }
    ],
    website: {
        type: String,
        trim: true,
    },
    websiteData: [
        {
            type: String,
            trim: true,
        }
    ]
})

const chatBot = new mongoose.model('CHATBOT', chatBotSchema)

module.exports = chatBot