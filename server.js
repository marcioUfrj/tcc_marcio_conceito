// VARIAVEIS DO SISTEMA
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')

//CONFIGURACOES
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json())

// ROTAS
app.use('/', indexRouter)

app.listen(process.env.PORT || 4400)