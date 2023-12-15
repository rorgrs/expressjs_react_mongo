const express = require('express')
const CryptoJS = require('crypto-js')
const auth = require('../middlewares/auth.js')
const User = require('../models/user-model.js')

const router = express.Router()

// Inserir um novo usuário
// POST "/users" BODY { ... }
router.post('/', auth())
router.post('/', async (req, res) => {
    try {
        var usuario = req.body

        if (!usuario.author_name)
            return res.status(400).json({ success: false, data: null, message: 'Usuario precisa ter um nome' })

        if (!usuario.author_email)
            return res.status(400).json({ success: false, data: null, message: 'Usuario precisa ter um email' })

        if (!usuario.author_user)
            return res.status(400).json({ success: false, data: null, message: 'Usuario precisa ter um login' })

        if (!usuario.author_pwd)
            return res.status(400).json({ success: false, data: null, message: 'Usuario precisa ter uma senha' })

        if (!usuario.author_level)
            usuario.author_level = 'normal'

        if (!usuario.author_status)
            usuario.author_status = 0

        usuario.author_pwd = CryptoJS.MD5(usuario.author_pwd).toString()

        const response = await User.create(usuario)

        res.json({ success: true, message: "Usuario cadastrado com sucesso.", data: response })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null })
    }
})

// Retornar um usuario específico
// GET "/:id"
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const response = await User.findOne({ _id: id })
        res.json({ success: true, message: null, data: response })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, data: null })
    }
})

module.exports = router
