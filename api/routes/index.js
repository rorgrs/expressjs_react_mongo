const express = require('express')
const articles = require('./articles')
const users = require('./users')
const login = require('./login')
const mongoose = require('mongoose')
const router = express.Router()

mongoose.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('connected', () => {
    console.log('MongoDB conectado')
})

mongoose.connection.on('error', (err) => {
    console.error('Erro na conexão com o MongoDB:', err)
})

router.use(express.json())

router.use('/artigos', articles)
router.use('/usuarios', users)
router.use('/login', login)

module.exports = router