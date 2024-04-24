const jwt = require('jsonwebtoken')

module.exports.assignToken = async (userData) => {
    const { email, _id } = userData;
    const chatbotId = userData.botId;

    const token = await jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

    const user = { email, chatbotId, token };

    return user;
}