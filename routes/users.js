const express = require('express')
const router = express.Router()
const User = require('../models/user')

//Get all Users
router.get('/', async (req, res) => {
  try {
    const inUsers = await User.find()
    res.json(inUsers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get all Users By ROLE
router.get('/ByLoginId/:idLogin', async (req, res) => {
  try {
    const inUsers = await User.find({ loginId: req.params.idLogin })
    res.json(inUsers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get all Users By ROLE
router.get('/ByRole/:role', async (req, res) => {
  try {
    const inUsers = await User.find({ role: req.params.role })
    res.json(inUsers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get all Users By CEFR
router.get('/ByCEFR/:nivelCEFR', async (req, res) => {
  try {
    const inUsers = await User.find({ nivelCEFR: req.params.nivelCEFR })
    res.json(inUsers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get all Users By JLPT
router.get('/ByJLPT/:nivelJLPT', async (req, res) => {
  try {
    const inUsers = await User.find({ nivelJLPT: req.params.nivelJLPT })
    res.json(inUsers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get all Users By Shirai
router.get('/ByShirai/:nivelShirai', async (req, res) => {
  try {
    const inUsers = await User.find({ nivelShirai: req.params.Shirai })
    res.json(inUsers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one User by ID
router.get('/:id', async (req, res) => {
  try {
    const inUser = await User.findById(req.params.id)
    res.json(inUser)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create New User
router.post('/', async (req, res) => {
  const inUser = new User({
    nickname: req.body.nickname,
    nivelCEFR: req.body.nivelCEFR,
    nivelJLPT: req.body.nivelJLPT,
    nivelShirai: req.body.nivelShirai,
    role: req.body.role,
    loginId: req.body.loginId
  })
  
  try {
    const newUser = await inUser.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update User
router.put('/:id', async (req, res) => {
  let inUser
  try {
    inUser = await User.findById(req.params.id)
    inUser.nickname = req.body.nickname
    inUser.nivelCEFR = req.body.nivelCEFR
    inUser.nivelJLPT = req.body.nivelJLPT
    inUser.nivelShirai = req.body.nivelShirai
    inUser.role = inUser.role
    inUser.loginId = inUser.loginId
    inUser.createdDate = inUser.createdDate
    const updatedUser = await inUser.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update User by Login Id
router.put('/ByLoginId/:idLogin', async (req, res) => {
  let inUser = []
  try {
    inUser = await User.find({ loginId: req.params.idLogin })
    if (inUser.length === 0) throw { message: "User not found" }
    inUser[0].nickname = req.body.nickname
    inUser[0].nivelCEFR = req.body.nivelCEFR
    inUser[0].nivelJLPT = req.body.nivelJLPT
    inUser[0].nivelShirai = req.body.nivelShirai
    inUser[0].role = inUser[0].role
    console.log(inUser)
    inUser[0].loginId = inUser[0].loginId
    inUser[0].createdDate = inUser[0].createdDate
    const updatedUser = await inUser[0].save()
    res.json(updatedUser)
  } catch (err) {
    if (inUser.length === 0) {
      res.status(404).json({ message: err.message })
    } else {
      res.status(400).json({ message: err.message })
    }
  }
})

// Delete User
router.delete('/:id', async (req, res) => {
  let inUser
  try {
    inUser = await User.findById(req.params.id)
    await inUser.remove()
    res.json({ message: "Deleted User" })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


module.exports = router