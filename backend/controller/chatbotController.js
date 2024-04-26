const { NlpManager } = require('node-nlp');
const path = require('path')
const manager = new NlpManager({ languages: ['en'], autoSave: false });
const { addIntent, updateData } = require('../utills/prepareData')
const Chatbot = require('../model/chatBotModel')
const xlsx = require('xlsx');
const { deleteTempFile } = require('../utills/deleteTempFile')
const { TrainModel } = require('../middleware/trainModel')
const { getAnswerFromQA } = require('../utills/HummingFace')

// ------------------------ CHAT WITH BOT ----------------------------------
module.exports.chatWithBot = async (req, res) => {
    try {
        const { question, chatId } = req.body

        if (!question || !chatId) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const isChatbotExists = await Chatbot.findById(chatId)

        if (!isChatbotExists) {
            return res.status(400).json({ error: "Chatbot doesn't exists" })
        }

        const modelPath = path.join(__dirname, `../uploads/trained_model/${chatId}.nlp`);
        await manager.load(modelPath);

        const response = await manager.process('en', question);

        if (!response.answer) {
            if (isChatbotExists.websiteData !== null && isChatbotExists.websiteData.length > 0) {
                const combinedString = isChatbotExists.websiteData.join("\n\n");
                const response = await getAnswerFromQA(question, combinedString)

                if (response.answer) {
                    return res.status(200).json({ answer: response.answer });
                }
            }
            return res.status(200).json({ answer: "Sorry! I didn't understand" });
        }

        res.status(200).json({ answer: response.answer });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// ------------------------ TRAIN THE CHATBOT MODEL WITH QA's ----------------------------------
module.exports.trainQuestionData = async (req, res) => {
    try {
        const user = req.user
        const { question, answer } = req.body

        if (!question || !answer) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const newData = [addIntent(question, answer)]

        const arr = await Chatbot.findByIdAndUpdate({ _id: user.botId }, { $push: { data: newData } }, { new: true })

        await TrainModel(user.botId, arr.data)

        res.status(200).json({ message: "Model Updated and Saved Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// ------------------------ TRAIN THE CHATBOT MODEL WITH EXCEL ----------------------------------
module.exports.trainExcelData = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const user = req.user
        const file = req.files.file

        const workbook = xlsx.readFile(file.tempFilePath);

        let workbook_sheet = workbook.SheetNames;

        let workbook_response = xlsx.utils.sheet_to_json(
            workbook.Sheets[workbook_sheet[0]]
        );

        deleteTempFile(file.tempFilePath)

        const newData = workbook_response.map(({ Question, Answer }) => addIntent(Question, Answer));

        const data = await Chatbot.findByIdAndUpdate({ _id: user.botId }, { $push: { data: { $each: newData } } }, { new: true })

        await updateData(newData, user.botId)

        res.status(200).json({ message: "File upload successfully", data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }

}

// ------------------------ GET ALL QA'S ----------------------------------
module.exports.getAllQA = async (req, res) => {
    try {
        const user = req.user

        const result = await Chatbot.findById(user.botId)

        const qaArray = result.data.filter(item => !item.intent.includes('greeting'));

        res.status(200).json({ message: "Question fetched successfully", qaArray })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// ------------------------ DELETE QA ----------------------------------
module.exports.deleteQA = async (req, res) => {
    try {
        const user = req.user
        const { id } = req.body

        if (!id) {
            return res.status(400).json({ error: 'QA id is required' })
        }

        const isExists = await Chatbot.findOne({ _id: user.botId, data: { $elemMatch: { _id: id } } });

        if (!isExists) {
            return res.status(400).json({ error: 'QA not found' })
        }

        await Chatbot.updateOne(
            { _id: user.botId },
            { $pull: { data: { _id: id } } },
            { new: true }
        );


        const modelPath = path.join(__dirname, `../uploads/trained_model/${user.botId}.nlp`);

        await deleteTempFile(modelPath)

        const arr = await Chatbot.findOne({ _id: user.botId })

        await TrainModel(user.botId, arr.data)

        res.status(200).json({ message: "Question deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// ------------------------ UPDATE QA ----------------------------------
module.exports.updateQA = async (req, res) => {
    try {
        const user = req.user
        const { id } = req.params

        const { question, answer } = req.body

        if (!id) {
            return res.status(400).json({ error: 'QA id is required' })
        }

        const isExists = await Chatbot.findOne({ _id: user.botId, "data._id": id });

        if (!isExists) {
            return res.status(400).json({ error: 'QA not found' })
        }

        const newData = addIntent(question, answer)

        const updatedChatbot = await Chatbot.findOneAndUpdate(
            { _id: user.botId, "data._id": id },
            { $set: { "data.$.utterance": newData.utterance, "data.$.answer": newData.answer, "data.$.intent": newData.intent } },
            { new: true }
        );

        const modelPath = path.join(__dirname, `../uploads/trained_model/${user.botId}.nlp`);
        await deleteTempFile(modelPath)

        const arr = await Chatbot.findOne({ _id: user.botId })
        await TrainModel(user.botId, arr.data)

        res.status(200).json({ message: "Question updated successfully", updatedChatbot, data: arr.data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// module.exports.trainChatbotModel = async (req,res) => {
//     try {
//         const user = req.user

//         const modelPath = path.join(__dirname, `../uploads/trained_model/${user.botId}.nlp`);

//         await deleteTempFile(modelPath)

//         const arr = await Chatbot.findById({ _id: user.botId })

//         await TrainModel(user.botId, arr.data)

//         res.status(200).json({ message: "Model Trained Successfully" })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ success: false, message: "Internal server error" })
//     }
// }