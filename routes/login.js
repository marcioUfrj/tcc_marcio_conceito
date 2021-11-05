const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { checkNotAuthenticated } = require('../basicAuth')
const { ROLE } = require('../variables')

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

router.get('/', checkNotAuthenticated, (req, res) => {
  res.render('login/login', { inUser: new User()})
})

router.post('/', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
  })
)

router.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('login/register', { inUser: new User(), messageError: ''})
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
  let user
  try {
    user = new User({
      nickname: req.body.name,
      email: req.body.email,
      role: ROLE.BASIC
    })
    const checkEmail = await User.find({ email: req.body.email }, { email: 1 })
    if (checkEmail.length == 0) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      user.password = hashedPassword
      const newUser = await user.save()
      res.redirect('/login')
    } else {
      res.render('login/register', { inUser: user, errorMessage: 'Email já cadastrado.' })
    }
  } catch{
    res.render('login/register', { inUser: user, errorMessage: 'Erro no servidor ao cadastrar, favor tentar novamente.' })
  }
})

router.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

module.exports = router