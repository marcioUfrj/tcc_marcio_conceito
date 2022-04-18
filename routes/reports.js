const express = require('express')
const router = express.Router()
const Report = require('../models/report')


router.get('/', async (req, res) => {
  try {
    const reports = await Report.find() // retorna array com Report
    res.json(reports)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one Report
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.find({ _id: req.params.id }) // retorna array com Report
    res.json(report)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Insert New Report
router.post('/', async (req, res) => {
  const inReport = new Report({
    idUser:  req.body.idUser,
    idCanDo: req.body.idCanDo,
    answers: req.body.answers
  })
  
  try {
    const newReport = await inReport.save()
    res.json(newReport)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update Report
router.put('/:id', async (req, res) => {
  let inReport
  try {
    inReport = await Report.findById(req.params.id)
    
    inReport.answers = req.body.answers
    
    const editReport = await inReport.save()
    res.json(editReport)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete Report
router.delete('/:id', async (req, res) => {
  let inReport
  try {
    inReport = await Report.findById(req.params.id)
    
    await inReport.remove()
    res.json("Relatorio deletado")
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Delete Report
router.delete('/ByCanDo/:id', async (req, res) => {
  let inReport
  try {
    inReport = await Report.find({ idCanDo: req.params.id })
    
    inReport.forEach( async (item) => {
      await item.remove()
    })

    res.json("Relatorios deletados para o CanDo solicitado.")
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router