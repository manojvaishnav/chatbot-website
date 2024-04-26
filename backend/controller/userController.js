const User = require('../model/userModel')
const Chatbot = require('../model/chatBotModel')
const jwt = require('jsonwebtoken');
const jwt_secret_key = process.env.JWT_SECRET_KEY
const greetingData = require('../uploads/training_data/greeting_data')
const { assignToken } = require('../utills/generateToken')
const { TrainModel } = require('../middleware/trainModel');

// ------------------------ USER REGISTERATION ----------------------------------
module.exports.registerUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const isExists = await User.findOne({ email })
        if (isExists) {
            return res.status(400).json({ error: "User already registered" })
        }

        const chatBot = new Chatbot({
            data: greetingData
        })

        const newUser = new User({
            email,
            password,
            botId: chatBot._id
        })

        await chatBot.save()
        const userData = await newUser.save()
        await TrainModel(chatBot._id, chatBot.data)

        const user = await assignToken(userData)

        res.status(200).json({ success: true, message: "User registration successfull", user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// ------------------------ USER LOGIN ----------------------------------
module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const isExists = await User.findOne({ email })
        if (!isExists || !(await isExists.matchPassword(password))) {
            return res.status(400).json({ error: "Invalid email or password" })
        }

        const user = await assignToken(isExists)
        res.status(200).json({ success: true, message: "User login successfull", user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// ------------------------ CHECK VALID TOKEN ----------------------------------
module.exports.checkLogin = async (req, res) => {
    try {
        const { token } = req.body

        if (!token) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const isValid = jwt.verify(token, jwt_secret_key);

        if (isValid == false) {
            return res.status(200).json({ success: false })
        }

        res.status(200).json({ success: true, login: true })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}
