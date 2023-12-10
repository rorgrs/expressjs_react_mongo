const Article = require('../models/article-model')

module.exports = function () {
    return async function (req, res, next) {
        try {
            var artigo = await Article.findOne({"_id": req.params.id})
            const likes = artigo.kb_liked_count + 1
            await Article.findByIdAndUpdate(req.params.id, { kb_liked_count: likes }, { new: true })
            next()
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Erro ao incrementar like do artigo.', data: null })
        }
    }
}