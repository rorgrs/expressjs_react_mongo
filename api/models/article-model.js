const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    kb_title: { type: String, default: null, index: true },
    kb_body: { type: String, default: null },
    kb_permalink: { type: String, default: null },
    kb_keywords: { type: String, default: null },
    kb_liked_count: { type: Number, default: 0 },
    kb_published: { type: Boolean, default: false },
    kb_suggestion: { type: Boolean, default: false },
    kb_featured: { type: Boolean, default: false },
    kb_author_email: { type: String, default: null },
    kb_published_date: { type: Date, default: Date.now }
})

//coloca o schema no banco em si
mongoose.model('Article', articleSchema)

module.exports = mongoose.models.Article