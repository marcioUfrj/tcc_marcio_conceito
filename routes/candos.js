const express = require('express')
const router = express.Router()
const CanDo = require('../models/cando')
const Exercise = require('../models/exercise')

//Pagina inicial
router.get('/', async (req, res) => {
  try {
    const canDos = await CanDo.find()
    res.json(canDos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get all Can-Dos by single Level
router.get('/ByLevel/:id_nivel', async (req, res) => {
  try {
    const canDos = await CanDo.find({ level: req.params.id_nivel }, 
      { _id: 1, number: 1, name: 1, lesson: 1, level: 1 }).sort({ number: 'asc' })
    res.json(canDos)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one Can-do by ID
router.get('/:id', async (req, res) => {
  try {
    const in_canDo = await CanDo.findById(req.params.id)
    res.json(in_canDo)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create New Can-do
router.post('/', async (req, res) => {
  const in_cando = new CanDo({
    number: req.body.number,
    name: req.body.name,
    lesson: req.body.lesson,
    level: req.body.level
  })
  
  try {
    const newCanDo = await in_cando.save()
    res.status(201).json(newCanDo)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update Can-do
router.put('/:id', async (req, res) => {
  let in_canDo
  try {
    in_canDo = await CanDo.findById(req.params.id)
    //console.log('in_canDo: ' + in_canDo)
    in_canDo.number = req.body.number
    in_canDo.name = req.body.name
    in_canDo.lesson = req.body.lesson
    in_canDo.level = req.body.level
    const updatedCanDo = await in_canDo.save()
    res.json(updatedCanDo)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete Can-do
router.delete('/:id', async (req, res) => {
  let in_canDo
  try {
    in_canDo = await CanDo.findById(req.params.id)
    await in_canDo.remove()
    res.json({ message: "Deleted Can-Do" })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


module.exports = router