const express = require('express')
const { addCompanyData, getCompanyDetail, updateCompanyDetail } = require('../controller/companyDetailController')
const { requireLogin } = require('../middleware/requireLogin')
const router = express.Router()

router.get('/', requireLogin, getCompanyDetail)
router.post('/', requireLogin, addCompanyData)
router.put('/:id', requireLogin, updateCompanyDetail)

module.exports = router