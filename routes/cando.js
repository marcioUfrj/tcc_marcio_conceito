const express = require('express')
const router = express.Router()
const CanDo = require('../models/cando')
const Exercise = require('../models/exercise')
const { checkAuthenticated } = require('../basicAuth')

//Pagina inicial
router.get('/', checkAuthenticated, async (req, res) => {
  let searchOptions = {}
  if (req.query.level_search != null && req.query.level_search !== '') {
    searchOptions.level = new RegExp(req.query.level_search, 'i')
  }
  try {
    const can_dos = await CanDo.find(searchOptions)
    res.render('cando/index', {
      canDos: can_dos,
      in_canDo: new CanDo(),
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})


// Create New Can-do
router.post('/', checkAuthenticated, async (req, res) => {
  const in_cando = new CanDo({
    number: req.body.number,
    name: req.body.name,
    lesson: req.body.lesson,
    level: req.body.level
  })
  
  try {
    const newCanDo = await in_cando.save()
    res.redirect('/cando')
  } catch {
    res.redirect('/cando')
  }
})

// Edit Can-do
router.get('/:id/edit', checkAuthenticated, async (req, res) => {
  try {
    const in_canDo = await CanDo.findById(req.params.id)
    const in_exercises = await Exercise.find({ cando_id: req.params.id })
    res.render('cando/edit', {
      in_canDo: in_canDo,
      in_exercises: in_exercises
     })
  } catch {
    res.redirect('/cando')
  }
})

// Update Can-do
router.put('/:id', checkAuthenticated, async (req, res) => {
  let in_canDo
  try {
    in_canDo = await CanDo.findById(req.params.id)
    //console.log('in_canDo: ' + in_canDo)
    in_canDo.number = req.body.number
    in_canDo.name = req.body.name
    in_canDo.lesson = req.body.lesson
    in_canDo.level = req.body.level
    await in_canDo.save()
    res.redirect('/cando')
  } catch {
    if (in_canDo == null) {
      res.redirect('/cando')
    } else {
      res.render('cando/edit', { in_canDo: in_canDo })
    }
  }
})

// Create New Can-do Exercise
router.get('/:id/edit/new-exercise', checkAuthenticated, async (req, res) => {
  try {
    const in_canDo = await CanDo.findById(req.params.id)
    res.render('cando/new_exercise', { 
      in_canDo: in_canDo,
      in_exercise: new Exercise()
     })
  } catch {
    res.redirect('/cando')
  }
})

// Edit Can-do Exercise
router.get('/:id/edit/edit-exercise/:idExercise', checkAuthenticated, async (req, res) => {
  try {
    const in_canDo = await CanDo.findById(req.params.id)
    const in_exercise = await Exercise.findById(req.params.idExercise)
    res.render('cando/edit_exercise', { 
      in_canDo: in_canDo,
      in_exercise: in_exercise
     })
  } catch {
    res.redirect('/cando')
  }
})

// Update Can-do Exercise
router.put('/:id/edit/edit-exercise/:idExercise', checkAuthenticated, async (req, res) => {
  let in_exercise
  let in_canDo
  try {
    in_exercise = await Exercise.findById(req.params.idExercise)
    
    in_exercise.cando_id = req.params.id
    in_exercise.name = req.body.name
    in_exercise.description = req.body.description    
    in_exercise.questions = getQuestions(req.body)
    
    const editExercise = await in_exercise.save()
    res.redirect(`/cando/${req.params.id}/edit`)
  } catch {
    if (in_exercise == null) {
      console.log('erro ao buscar exercicio')
      res.redirect(`/cando/${req.params.id}/edit`)
    } else {
      console.log('erro ao salvar exercicio')
      res.redirect(`/cando/${req.params.id}/edit`)
    }
  }
})

// Insert New Can-do Exercise
router.post('/:id/edit/new-exercise', checkAuthenticated, async (req, res) => {
  let in_canDo
  const in_exercise = new Exercise({
    name: req.body.name,
    description: req.body.description,
    questions: getQuestions(req.body),
    cando_id: req.params.id
  })
  
  try {
    in_canDo = await CanDo.findById(req.params.id)
    const new_exercise = await in_exercise.save()
    res.redirect(`/cando/${req.params.id}/edit`)
  } catch {
    if (in_canDo == null) {
      res.redirect('/cando')
    } else {
      res.redirect(`/cando/${req.params.id}/edit`)
    }
  }
})

// FUNCAO QUE LE O CORPO HTML E MONTA O OBJETO COM AS QUESTOES
function getQuestions(body) {

let ar_questions = []

for (i = 1; i <= 6; i++) {
  if (body['question' + i] != '') {
    let i_question = {
      question: body['question' + i],
      answers: []
    }

    for(j = 1; j<= 4; j++) {
      if (body['question' + i + 'answer' + j] != '') {
        let answer = {
          text: body['question' + i + 'answer' + j],
          correct: false
        }
        
        if (body['cb_question' + i + 'answer' + j] == 'true') {
          answer.correct = true
        } else {
          answer.correct = false
        } // fim if resposta not null

        i_question.answers[j - 1] = answer
      } // fim loop respostas
    }
    ar_questions[i - 1] = i_question
  } // fim if questao not null
} // fim loop questoes
  return ar_questions
}

module.exports = router