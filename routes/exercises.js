const express = require('express')
const router = express.Router()
const Exercise = require('../models/exercise')


router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find() // retorna array com exercise
    res.json(exercises)
  } catch (err) {
    console.log('erro buscando exercicios by can-do')
    res.status(500).json({ message: err.message })
  }
})

// Get all Exercises by single Can-Do
router.get('/ByCanDo/:idCanDo', async (req, res) => {
  try {
    const exercises = await Exercise.find({ cando_id: req.params.idCanDo }) // retorna array com exercise
    res.json(exercises)
  } catch (err) {
    console.log('erro buscando exercicios by can-do')
    res.status(500).json({ message: err.message })
  }
})

// Get one Exercise
router.get('/:id', async (req, res) => {
  console.log('render => lessons/lesson/can-do/exercise: ' + req.params.id_nivel + '  ' + req.params.idCanDo + ' ' + req.params.id)
  try {
    const exercise = await Exercise.find({ _id: req.params.id }) // retorna array com exercise
    res.json(exercise)
  } catch (err) {
    console.log('erro buscando exercicio')
    res.status(500).json({ message: err.message })
  }
})

// Insert New Can-do Exercise
router.post('/', async (req, res) => {
  const inExercise = new Exercise({
    name: req.body.name,
    index_val: parseInt(req.body.indexVal),
    description: req.body.description,
    questions: req.body.questions,
    cando_id: req.body.idCanDo
  })
  
  try {
    const newExercise = await inExercise.save()
    res.json(newExercise)
  } catch (err) {
    console.log('erro criando exercicio')
    res.status(400).json({ message: err.message })
  }
})

// Update Can-do Exercise
router.put('/:id', async (req, res) => {
  let in_exercise
  try {
    in_exercise = await Exercise.findById(req.params.id)
    
    in_exercise.cando_id = req.body.idCanDo
    in_exercise.index_val = parseInt(req.body.indexVal),
    in_exercise.name = req.body.name
    in_exercise.description = req.body.description    
    in_exercise.questions = req.body.questions
    
    const editExercise = await in_exercise.save()
    res.json(editExercise)
  } catch (err) {
    console.log('erro atualizando exercicio')
    res.status(400).json({ message: err.message })
  }
})

// Delete Can-do Exercise
router.delete('/:id', async (req, res) => {
  let in_exercise
  try {
    in_exercise = await Exercise.findById(req.params.id)
    
    await in_exercise.remove()
    res.json("Exercicio deletado")
  } catch (err) {
    console.log('erro atualizando exercicio')
    res.status(500).json({ message: err.message })
  }
})

module.exports = router