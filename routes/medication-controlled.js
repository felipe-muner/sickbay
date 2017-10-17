const express = require('express')
const i18n = require('i18n')

const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const ssc = require(process.env.PWD + '/controls/SchoolStudentControl')
const sbmcc = require(process.env.PWD + '/controls/SickBayMedicationControlledControl')
const sbmsc = require(process.env.PWD + '/controls/SickBayMedicationScheduleControl')
const moment = require('moment')

const router = express.Router()

router.get('/new', ssc.get, function(req, res, next) {
  res.render('medication-controlled/new', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    SchoolStudent: req.SchoolStudent,
    momentAtual: moment().format('YYYY-MM-DD')
  })
}).get('/', ssc.get, sbmcc.get, function(req, res, next) {
  let flashMsg = req.session.flashMsg
  if(flashMsg) delete req.session.flashMsg
  res.render('medication-controlled/list', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    medCtrl: req.medCtrl,
    SchoolStudent: req.SchoolStudent,
    flashMsg
  })
}).post('/new', sbmcc.new, function(req, res, next) {
  req.session.flashMsg = {
    strongMsg: __('medicationControlled'),
    txtMsg: __('messages.sucessCreate'),
    styleMsg: 'alert-success'
  }
  res.json({ redirect: '/medication-controlled' })
}).post('/more-info', ssc.get, sbmcc.getById, function(req, res, next) {
  res.render('medication-controlled/more-info', {
    sess: req.session,
    redirectUrl: '/medication-controlled',
    medCtrl: req.medCtrl
  })
}).post('/', ssc.get, sbmcc.findByFilter, function(req, res, next) {
  res.render('medication-controlled/list', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    medCtrl: req.medCtrl,
    SchoolStudent: req.SchoolStudent
  })
}).post('/update-medication', sbmsc.update, function(req, res, next) {
  res.json(req.body)
}).post('/close', sbmcc.close, function(req, res, next) {
  req.session.flashMsg = {
    strongMsg: __('medicationControlled'),
    txtMsg: __('messages.sucessClose'),
    styleMsg: 'alert-success'
  }
  res.redirect('/medication-controlled')
}).get('/export-pdf', ssc.get, sbmcc.exportPDF)

module.exports = router
