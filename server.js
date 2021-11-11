if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// VARIAVEIS DO SISTEMA
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const indexRouter = require('./routes/index')
const lessonRouter = require('./routes/lessons')
const candoRouter = require('./routes/cando')
const loginRouter = require('./routes/login')

//CONFIGURACOES
app.set('view engine', 'ejs') 
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({limit: '10mb', extended: false}))
app.use(express.json()) // API : post
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// ROTAS
app.use('/', indexRouter)
app.use('/lessons', lessonRouter)
app.use('/cando', candoRouter)
app.use('/login', loginRouter)

app.listen(process.env.PORT || 4400)

/*

EXERCICIOS para Determinado Can-do
  Modelagem
    1 exercicio = [simple task]
    1 exercicio = 1 complex task = [simple step]

  1. base com dados de desempenho: execucao
    {
      id_execucao: ,
      user_id: , 
      exercise: { 
        id: ,
        #correct questions/steps: ,
        #total questions/steps: 
      }
      date_done: 
    }

  Preencher com os to-dos
  
PAGINA PRINCIPAL
  Performance Por Can-Do    

*/