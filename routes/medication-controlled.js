const express = require('express')
const i18n = require('i18n')

const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const ssc = require(process.env.PWD + '/controls/SchoolStudentControl')
const moment = require('moment')

const router = express.Router()

router.get('/new', ssc.get, function(req, res, next) {
  res.render('medication-controlled/new', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    SchoolStudent: req.SchoolStudent,
    momentAtual: moment().format('YYYY-MM-DD')
  })
}).get('/', ssc.get, function(req, res, next) {
  res.render('medication-controlled/list', {
    sess: req.session,
    redirectUrl: req.originalUrl
  })
}).post('/new', function(req, res, next) {
  console.log(req.body)
  req.body.felipeteste = 'ok'
  res.json(req.body)
})

module.exports = router
