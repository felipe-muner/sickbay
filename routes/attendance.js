const express = require('express')
const i18n = require('i18n')

const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const ssc = require(process.env.PWD + '/controls/SchoolStudentControl')
const uc = require(process.env.PWD + '/controls/UserControl')
const satc = require(process.env.PWD + '/controls/SickBayAttendanceTypeControl')
const sbrc = require(process.env.PWD + '/controls/SickBayRemedyControl')
const umc = require(process.env.PWD + '/controls/UnitOfMeasureControl')
const sbac = require(process.env.PWD + '/controls/SickBayAttendanceControl')
const sbrac = require(process.env.PWD + '/controls/SickBayReturnAttendanceControl')
const moment = require('moment')

const router = express.Router()

router.get('/new', ssc.get, uc.getEmployer, satc.get, sbrc.get, umc.get, function(req, res, next) {
  res.render('attendance/new', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    SchoolStudent: req.SchoolStudent,
    Employer: req.Employer,
    AttendanceType: req.AttendanceType,
    Remedy: req.Remedy,
    UnitOfMeasure: req.UnitOfMeasure,
    momentAtual: moment().format('YYYY-MM-DDT00:00')
  })
}).get('/', sbac.get, satc.get, function(req, res, next) {
  let flashMsg = req.session.flashMsg
  if(flashMsg) delete req.session.flashMsg
  res.render('attendance/list', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    attendances: req.attendances,
    attendanceType: req.AttendanceType,
    flashMsg
  })
}).post('/new', sbac.new, function(req, res, next) {
  req.session.flashMsg = {
    txtMsg: __('messages.sucessCreate'),
    styleMsg: 'alert-success'
  }
  res.json({ redirect: '/attendance' })
}).post('/more-info', sbac.getById, function(req, res, next) {
  res.render('attendance/more-info', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    attendance: req.attendance
  })
}).post('/', sbac.findByFilter, satc.get, function(req, res, next) {
  res.render('attendance/list', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    attendances: req.attendances,
    attendanceType: req.AttendanceType
  })
}).post('/save-return', sbrac.new, function(req, res, next) {
  res.json(req.returnAttendance)
})

module.exports = router
