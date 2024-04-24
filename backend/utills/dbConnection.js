const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Database connected')
}).catch((err) => {
    console.log(`Database connection error : ${err.message}`)
    console.log(err)
})