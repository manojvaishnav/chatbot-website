const express = require('express')
const router = express.Router()
const { requireLogin } = require('../middleware/requireLogin')
const { websiteScrap, getWebsiteData, deleteWebsiteData, deleteWebsite } = require('../controller/webScrapController')

router.get('/', requireLogin, getWebsiteData)
router.post('/', requireLogin, websiteScrap)
router.delete('/', requireLogin, deleteWebsite)
router.delete('/:id', requireLogin, deleteWebsiteData)

module.exports = router