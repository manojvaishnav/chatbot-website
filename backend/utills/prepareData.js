const { NlpManager } = require('node-nlp');
const path = require('path');
const manager = new NlpManager({ languages: ['en'], autoSave:false });

module.exports.addIntent = (question, answer) => {
    const intent = question.replace(/\s+/g, '_').toLowerCase();
    const utterance = question;
    const data = { intent, utterance, answer }
    return data
}

module.exports.updateData = async (newData, chatbotId) => {
    // Load old trained model
    const modelPath = path.join(__dirname, `../uploads/trained_model/${chatbotId}.nlp`);
    await manager.load(modelPath);

    // add new data to  the model
    newData.map((newData) => {
        manager.addDocument('en', newData.utterance, newData.intent);
        manager.addAnswer('en', newData.intent, newData.answer);
    })

    // train the model with new data
    await manager.train();

    // save the updated model
    await manager.save(modelPath);
}
