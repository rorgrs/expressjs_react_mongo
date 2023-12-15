const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth.js')
const contador = require('../middlewares/contador.js')
const Article = require('../models/article-model.js')
const User = require('../models/user-model.js')

/* --------------------- BACK --------------------- */

// Retornar todos os artigos
// GET "/lista"
router.get('/lista', async (req, res) => {
    try {
        const response = await Article.find()
        res.status(200).json({ success: true, message: null, data: response })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null })
    }
})

// Listagem de todos os artigos com filtro
router.get('/lista/:query', async (req, res) => {
    try {
        const titulo = req.params.query
        const response = await Article.find({ 'kb_title': { '$regex': titulo, '$options': 'i' } })
        res.status(200).json({ success: true, message: null, data: response })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null })
    }
})

// Retornar um artigo específico
// GET "/:id"
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const response = await Article.findById(id)
        res.json({ success: true, message: null, data: response })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null })
    }
})

// Incrementar likes
router.post('/:id/like', async (req, res) => {
    try {
        var artigo = await Article.findOne({ "_id": req.params.id })
        const likes = artigo.kb_liked_count + 1
        await Article.findByIdAndUpdate(req.params.id, { kb_liked_count: likes }, { new: true })
        res.status(200).send({ success: true, message: "Like incrementado com sucesso.", data: null })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Erro ao incrementar like do artigo.', data: null })
    }
})

// Inserir um novo artigo
// POST "/" BODY {"kb_title": "Titulo Teste", "kb_body": "Oiii", "kb_permalink": null, "kb_keywords": null, "kb_liked_count": 0, "kb_published": true, "kb_suggestion": false, "kb_featured": false, "kb_author_email": "rogersbjunior@gmail.com"}
router.post('/', auth())
router.post('/', async (req, res) => {
    var user = req.usuario
    var request = req.body
    request.kb_author_email = user.author_email
    try {
        const response = await Article.create(request)
        res.json({ success: true, message: "Artigo criado com sucesso.", data: response })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null })
    }
})

// Alterar um artigo
// PUT "/:id" BODY {"kb_title": "Titulo Teste", "kb_body": "Oiii", "kb_permalink": null, "kb_keywords": null, "kb_liked_count": 0, "kb_published": true, "kb_suggestion": false, "kb_featured": false, "kb_author_email": "rogersbjunior@gmail.com"}
router.put('/', auth())
router.put('/', async (req, res) => {
    const request = req.body
    try {
        const response = await Article.findByIdAndUpdate(request._id, { kb_title: request.kb_title, kb_body: request.kb_body, kb_featured: request.kb_featured }, { new: true })
        res.json({ success: true, message: null, data: response })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null })
    }
})

// Deletar um autor
// DELETE "/:id"
router.delete('/:id', auth()) //Middleware de autenticação
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const response = await Article.findByIdAndDelete(id)
        res.json({ success: true, message: null, data: response })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null })
    }
})

module.exports = router
