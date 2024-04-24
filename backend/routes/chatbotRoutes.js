const express = require('express')
const { chatWithBot, trainExcelData, trainQuestionData, getAllQA, deleteQA, updateQA } = require('../controller/chatbotController')
const router = express.Router()
const { requireLogin } = require('../middleware/requireLogin')

// Model Train
router.post('/upload/question', requireLogin, trainQuestionData)
router.post('/upload/file', requireLogin, trainExcelData)

// Public Chat Api
router.post('/chat', chatWithBot)

// QA's
router.get('/question', requireLogin, getAllQA)
router.post('/question', requireLogin, deleteQA)
router.put('/question/:id', requireLogin, updateQA)

module.exports = router