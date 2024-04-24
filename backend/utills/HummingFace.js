const { HfInference } = require('@huggingface/inference')
const hf = new HfInference(process.env.TOKEN)

module.exports.getAnswerFromQA = async (question, passage) => {
    const resp = await hf.questionAnswering({
        model: 'deepset/roberta-base-squad2',
        inputs: {
            question: question,
            context: passage
        }
    })

    return resp
}