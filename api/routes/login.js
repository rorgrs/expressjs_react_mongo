const express = require('express')
const router = express.Router()
const CryptoJS = require('crypto-js')
const User = require('../models/user-model.js')

/* --------------------- FUNCOES AUXILIARES --------------------- */

const secret = "assinatura extremamente secreta ninguem nunca vai descobrir"

function base64url(src) {
    // Converter p b64
    b64url = CryptoJS.enc.Base64.stringify(src)

    // Remover padding =
    b64url = b64url.replace(/=+$/, '')

    // Replace com base nas especificações base64url
    b64url = b64url.replace(/\+/g, '-')
    b64url = b64url.replace(/\//g, '_')

    return b64url
}

/* --------------------- BACK --------------------- */

router.post('/', async function (req, res) {
    try {
        let login = req.body

        //Hasha a senha pra buscar no banco
        let senha = CryptoJS.MD5(login.senha).toString()

        //Busca o usuario no banco
        let usuario = await User.findOne({ "author_user": login.usuario, "author_pwd": senha });

        if (!usuario) return res.status(404).json({ success: false, message: 'Usuário não encontrado.', data: null })

        // Header pro jwt
        var header = {
            "alg": "HS256",
            "typ": "JWT"
        }
        var headerString = CryptoJS.enc.Utf8.parse(JSON.stringify(header))
        var headerB64 = base64url(headerString)

        // Payload pro jwt
        var data = {
            "id": usuario._id
        }
        var dataString = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
        var dataB64 = base64url(dataString)

        //Header + payload pra fazer a assinatura
        var token = headerB64 + "." + dataB64

        //Assinatura do token (usada pra validação depois)
        var assinatura = CryptoJS.HmacSHA256(token, secret)
        assinatura = base64url(assinatura)

        //formato eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMzNywidXNlcm5hbWUiOiJqb2huLmRvZSJ9.EvTdOJSfbffGHLyND3BMDwWE22zUBOCRspPZEHlNEw
        var tokenAssinado = token + "." + assinatura

        var retorno = {
            id: usuario._id,
            token: tokenAssinado
        }

        return res.status(200).json({ success: true, message: 'Login efetuado com sucesso.', data: retorno })
    } catch (error) {
        console.log(error)
        return res.status(500).json('Não foi possível efetuar o login.')
    }

})

module.exports = router