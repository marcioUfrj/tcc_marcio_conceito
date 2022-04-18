if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// VARIAVEIS DO SISTEMA
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const cors = require('cors')

const indexRouter = require('./routes/index')
const candoRouter = require('./routes/candos')
const exerciseRouter = require('./routes/exercises')
const reportRouter = require('./routes/reports')
const userRouter = require('./routes/users')

//CONFIGURACOES
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({limit: '10mb', extended: false}))
app.use(express.json()) // API : post

app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// ROTAS
app.use('/', indexRouter)
app.use('/candos', candoRouter)
app.use('/exercises', exerciseRouter)
app.use('/reports', reportRouter)
app.use('/users', userRouter)

app.listen(process.env.PORT || 4000)

/*

EXERCICIOS para Determinado Can-do
  Modelagem
    1 exercicio = [simple task]
    1 exercicio = 1 complex task = [simple step]

  1. base com dados da execucao do exercicio
    Quais dados para avaliar fluência e memória
    {

    }

    Modelo:
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