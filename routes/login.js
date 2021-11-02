const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { checkNotAuthenticated } = require('../basicAuth')

const initializePassport = require('../passport-config')
initializePassport(
  passport, 
  getUserByEmail,
  getUserById
)

async function getUserByEmail(email) {
  try {
    const in_users = await User.find({ email: email }).limit(1)
    return in_users[0]     
  } catch {
    return null
  }
}

async function getUserById(idUser) {
  try {
    const in_users = await User.findById(idUser)
    return in_users
  } catch {
    return null
  }
}
let users = []

router.get('/', checkNotAuthenticated, (req, res) => {
  res.render('login/login')
})

router.post('/', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
  })
)

router.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('login/register')
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
      nickname: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    const newUser = user.save()
    res.redirect('/login')
  } catch{
    res.redirect('/login/register')
  }
  console.log(users)
})

router.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

module.exports = router