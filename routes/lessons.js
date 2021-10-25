const express = require('express')
const router = express.Router()
//const set_question = require('../public/javascripts/script')


router.get('/', (req, res) => {
  res.render('lessons/index')
})

router.get('/:id_nivel', (req, res) => {
  //res.send('Lista de Can-do do ' + req.params.id)
  res.render('lessons/nivel', {nivel_name: req.params.id_nivel})
})

router.get('/:id_nivel/:id_can_do', (req, res) => {
  //res.send('Lista de Can-do do ' + req.params.id)

  res.render('lessons/lesson', {
    nivel_name: req.params.id_nivel,
    can_do_name: req.params.id_can_do
  })
})

module.exports = router