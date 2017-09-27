const express = require('express')
const i18n = require('i18n')

const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const ssc = require(process.env.PWD + '/controls/SchoolStudentControl')
const sbmcc = require(process.env.PWD + '/controls/SickBayMedicationControlledControl')
const moment = require('moment')

const router = express.Router()

router.get('/new', ssc.get, function(req, res, next) {
  res.render('medication-controlled/new', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    SchoolStudent: req.SchoolStudent,
    momentAtual: moment().format('YYYY-MM-DD')
  })
}).get('/', sbmcc.get, function(req, res, next) {
  let flashMsg = req.session.flashMsg
  if(flashMsg) delete req.session.flashMsg

  console.log(req.medCtrl)
  res.render('medication-controlled/list', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    medCtrl: req.medCtrl,
    flashMsg
  })
}).post('/new', sbmcc.new, function(req, res, next) {
  req.session.flashMsg = {
    strongMsg: 'Medicamento Controlado',
    txtMsg: __('messages.sucessCreate'),
    styleMsg: 'alert-success'
  }
  res.json({ redirect: '/medication-controlled' })
}).post('/more-info', function(req, res, next) {
  console.log(req.body)
  res.render('medication-controlled/more-info', {
    sess: req.session,
    redirectUrl: req.originalUrl
  })
}).post('/find', sbmcc.get, function(req, res, next) {
// }).post('/find', sbmcc.findByFilter, function(req, res, next) {
  console.log(req.body)
  res.render('medication-controlled/list', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    medCtrl: req.medCtrl
  })
})

module.exports = router
