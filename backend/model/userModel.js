const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    botId: {
        type: String,
        trim: true,
        required: true
    },
})

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare the password
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const user = new mongoose.model('USER', userSchema)

module.exports = user