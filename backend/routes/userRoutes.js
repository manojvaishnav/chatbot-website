const express = require('express')
const { registerUser, loginUser, checkLogin } = require('../controller/userController')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/verify-token', checkLogin)


module.exports = router