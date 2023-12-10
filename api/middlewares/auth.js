const CryptoJS = require('crypto-js')
const User = require('../models/user-model')

const secret = "assinatura extremamente secreta ninguem nunca vai descobrir"

//Atualiza a variavel local do banco de dados conforme o arquivo

function base64url(source) {
    // Encode in classical base64
    encodedSource = CryptoJS.enc.Base64.stringify(source)

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '')

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-')
    encodedSource = encodedSource.replace(/\//g, '_')

    return encodedSource
}

module.exports = function () {
    return function (req, res, next) {
        try {
            var token = req.headers['token']

            if (!token)
                return res.status(401).json({ success: false, message: 'Autenticação inexistente.', data: null })

            //Divide as partes do token
            var tokenSplit = token.split('.')
            var tokenHeader = tokenSplit[0]
            var tokenPayload = tokenSplit[1]
            var tokenSign = tokenSplit[2]

            //Refaz a assinatura com base no header + payload e a chave secreta pra validar se o token originou daqui
            var assinaturaValidacao = CryptoJS.HmacSHA256(tokenHeader + '.' + tokenPayload, secret)
            assinaturaValidacao = base64url(assinaturaValidacao)

            //Se as assinaturas nao batem, nao permite a ação
            if (assinaturaValidacao !== tokenSign)
                return res.status(401).json({ success: false, message: 'Autenticação inválida.', data: null })

            var tokenInfoRaw = CryptoJS.enc.Base64.parse(tokenPayload)
            var tokenInfoString = CryptoJS.enc.Utf8.stringify(tokenInfoRaw)
            var tokenInfo = JSON.parse(tokenInfoString)

            User.findById(tokenInfo.id).then(function (usuario) {
                if (!usuario || usuario.author_level !== 'admin')
                    return res.status(401).json({ success: false, message: 'Usuário não autenticado.', data: null })

                req.usuario = usuario

                next()
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Erro ao validar sessão do usuário.', data: null })
        }
    }
}