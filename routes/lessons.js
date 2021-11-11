const express = require('express')
const router = express.Router()
const CanDo = require('../models/cando')
const Exercise = require('../models/exercise')
const { checkAuthenticated } = require('../basicAuth')


router.get('/', checkAuthenticated, (req, res) => {
  res.render('lessons/index')
})

router.get('/:id_nivel', checkAuthenticated, async (req, res) => {
  try {
    const canDos = await CanDo.find({ level: req.params.id_nivel }, 
      { _id: 1, number: 1, name: 1, lesson: 1 }).sort({ number: 'asc' })
    //res.send('Lista de Can-do do ' + req.params.id)
    res.render('lessons/nivel', {
      nivel_name: req.params.id_nivel,
      canDos: canDos,
      idUser: req.user.id
    })
  } catch {
    res.redirect('/lessons')
  }
})

router.get('/:id_nivel/:id_can_do', checkAuthenticated, async (req, res) => {
  console.log('render => lessons/lesson/can-do: ' + req.params.id_nivel + '  ' + req.params.id_can_do)
  try {
    // prepara sessao de exercicio
    
    // redireciona para a rota de exercicio com o primeiro da lista
    //const in_canDo = await CanDo.find({ name: req.params.id_can_do, level: req.params.id_nivel }) //retorna array com can-do
    // in_canDo[0].id
    const in_exercise = await Exercise.find({ cando_id: req.params.id_can_do }, {name: 1, _id: 1}).limit(1) // retorna array com exercise
    res.redirect(`/lessons/${req.params.id_nivel}/${req.params.id_can_do}/${0}`)
  } catch {
    console.log('erro buscando can-do')
    res.redirect(`/lessons/${req.params.id_nivel}`)
  }
})

// Exibe proximo exercicio
router.get('/:id_nivel/:id_can_do/:id_exercise', checkAuthenticated, async (req, res) => {
  //res.send('Lista de Can-do do ' + req.params.id)
  console.log('render => lessons/lesson/can-do/exercise: ' + req.params.id_nivel + '  ' + req.params.id_can_do + ' ' + req.params.id_exercise)
  try {
    //in_canDo = await CanDo.find({ name: req.params.id_can_do, level: req.params.id_nivel }) //retorna array com can-do
    const in_canDo = await CanDo.findById(req.params.id_can_do) //retorna can-do
    //in_exercise = await Exercise.findById(req.params.id_exercise, {name: 1, description: 1}) // retorna array com exercise
    const in_exercise = await Exercise.find({ index_val: req.params.id_exercise}, {name: 1, description: 1}) // retorna array com exercise
    if (in_exercise.length == []) {
      res.redirect(`/lessons/${req.params.id_nivel}/${req.params.id_can_do}`)
    } else {
      res.render('lessons/lesson', {
        canDo: in_canDo,
        exercise: in_exercise[0],
        i_exercise: parseInt(req.params.id_exercise),
        i_question: 0,
        question: [],
        showQuestion: 'hide',
        in_state: 'preparation'
      })
    }
  } catch {
    console.log('erro buscando exercicio')
    res.redirect(`/lessons/${req.params.id_nivel}`)
  }
})

// Exibe exercicio e questao
router.get('/:id_nivel/:id_can_do/:id_exercise/:index_q', checkAuthenticated, async (req, res) => {
  //res.send('Lista de Can-do do ' + req.params.id)
  console.log('render=> lessons/lesson/can-do/exercise/question: ')
  try {
    //const in_canDo = await CanDo.find({ name: req.params.id_can_do, level: req.params.id_nivel }) //retorna array com can-do
    const in_canDo = await CanDo.findById(req.params.id_can_do) //retorna can-do
    //const in_exercise = await Exercise.findById(req.params.id_exercise) // retorna array com exercises
    const in_exercise_temp = await Exercise.find({ index_val: req.params.id_exercise}) // retorna array com exercise
    const in_exercise = in_exercise_temp[0]

    let in_state
    if (req.params.index_q == 0) {
      in_state = 'start'
    } else if (req.params.index_q < in_exercise.questions.length - 1) {
      in_state = 'next'
    } else {
      in_state = 'end'
    }
    res.render('lessons/lesson', {
      canDo: in_canDo,
      exercise: in_exercise,
      i_exercise: parseInt(req.params.id_exercise),
      i_question: parseInt(req.params.index_q),
      question: in_exercise.questions[req.params.index_q],
      showQuestion: '',
      in_state: in_state
    })
  } catch {
    console.log('erro buscando can-do')
    res.redirect(`/lessons/${req.params.id_nivel}`)
  }
})

module.exports = router