const express = require('express')
const router = express.Router()
const { checkAuthenticated, authRole } = require('../basicAuth')
const { ROLE } = require('../variables')

router.get('/', checkAuthenticated, (req, res) => {
  res.render('index', {user: req.user, role: ROLE})
})

module.exports = router