var mongoose = require('mongoose')
var Schema = mongoose.Schema

const usersSchema = new Schema({
    author_name: { type: String, default: null },
    author_email: { type: String, default: null },
    author_user: { type: String, default: null },
    author_pwd: { type: String, default: null },
    author_level: { type: String, default: "normal" },
    author_status: { type: Number, default: 1 },
    author_create_date: { type: Date, default: Date.now }
})

//coloca o schema no banco em si
mongoose.model('User', usersSchema)

module.exports = mongoose.models.User