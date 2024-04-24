const cheerio = require('cheerio');
const axios = require('axios');
const Chatbot = require('../model/chatBotModel')

// ------------------------ ADD WEBSITE FOR SCRAPING ----------------------------------
module.exports.websiteScrap = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "Website url is required" })
        }

        const user = req.user
        const response = await axios.get(url);

        const $ = cheerio.load(response.data);

        const paragraphs = []

        $('p').each((index, element) => {
            const text = $(element).text().trim();
            if (text) {
                paragraphs.push(text);
            }
        });

        const data = await Chatbot.findByIdAndUpdate(user.botId,
            { websiteData: paragraphs, website: url },
            { new: true }
        )

        res.status(200).json({ message: "Website added successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// ------------------------ GET SCRAPING DATA ----------------------------------
module.exports.getWebsiteData = async (req, res) => {
    try {
        const user = req.user

        const data = await Chatbot.findById(user.botId, { website: 1, websiteData: 1 })

        res.status(200).json({ message: "Website data fetched successfully", data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// ------------------------ DELETE WEBSITE ----------------------------------
module.exports.deleteWebsite = async (req, res) => {
    try {
        const user = req.user

        const chatbot = await Chatbot.findById(user.botId);

        if (!chatbot) {
            return res.status(400).json({ error: "Chatbot not found" })
        }

        chatbot.website=null
        chatbot.websiteData=null

        const data = await chatbot.save();

        res.status(200).json({ message: "Website deleted successfully", data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// ------------------------ DELETE SCRAPING DATA ----------------------------------
module.exports.deleteWebsiteData = async (req, res) => {
    try {
        const { id } = req.params
        const user = req.user

        const chatbot = await Chatbot.findById(user.botId);

        if (!chatbot) {
            return res.status(400).json({ error: "Chatbot not found" })
        }

        chatbot.websiteData.splice(id, 1);
        const data = await chatbot.save();

        res.status(200).json({ message: "Website data deleted successfully", data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}