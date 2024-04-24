const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
require('./utills/dbConnection')
const fileUpload = require('express-fileupload')
const chatRoutes = require('./routes/chatbotRoutes')
const userRoutes = require('./routes/userRoutes')
const webscrapingRoutes = require('./routes/webscrapingRoutes')
const companyRoutes = require('./routes/companyRoutes')

// middleware & variables
app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))
const port = process.env.PORT

// Api Routes
app.use('/api/v1/chatbot', chatRoutes)
app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/website', webscrapingRoutes)
app.use('/api/v1/company', companyRoutes)


app.listen(port, () => {
    console.log(`server started at port ${port}`)
})