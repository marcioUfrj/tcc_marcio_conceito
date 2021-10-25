// VARIAVEIS DO SISTEMA
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const indexRouter = require('./routes/index')
const lessonRouter = require('./routes/lessons')

//CONFIGURACOES
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.json())

// ROTAS
app.use('/', indexRouter)
app.use('/lessons', lessonRouter)

app.listen(process.env.PORT || 4400)