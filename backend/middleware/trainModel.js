const { NlpManager } = require('node-nlp');
const path = require('path')
const manager = new NlpManager({ languages: ['en'], autoSave:false });

module.exports.TrainModel = async (chatId, data) => {

    data.forEach(({ intent, utterance, answer }) => {
        manager.addDocument('en', utterance, intent);
        manager.addAnswer('en', intent, answer);
    });

    await manager.train();

    const modelPath = path.join(__dirname, `../uploads/trained_model/${chatId}.nlp`);

    await manager.save(modelPath);

}