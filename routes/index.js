const express = require('express')
const router = express.Router()
const { checkAuthenticated } = require('../basicAuth')

router.get('/', checkAuthenticated, (req, res) => {
  res.render('index')
})

module.exports = router