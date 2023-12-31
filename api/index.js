const express = require('express')
const routes = require('./routes')

const app = express()

app.use(function (req, res, next) { 
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "*")
    res.setHeader("Access-Control-Allow-Credentials", true)
    next()
})

app.use('/', routes)

app.listen(8080, function () {
    console.log('Aplicação executando na porta 8080.')
}) 