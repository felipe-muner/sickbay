const express = require('express')
const i18n = require('i18n')

const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const ssc = require(process.env.PWD + '/controls/SchoolStudentControl')
const uc = require(process.env.PWD + '/controls/UserControl')
const satc = require(process.env.PWD + '/controls/SickBayAttendanceTypeControl')
const sbrc = require(process.env.PWD + '/controls/SickBayRemedyControl')
const umc = require(process.env.PWD + '/controls/UnitOfMeasureControl')
const moment = require('moment')

const router = express.Router()

router.get('/new', ssc.get, uc.getEmployer, satc.get, sbrc.get, umc.get, function(req, res, next) {

  res.render('attendence/new', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    SchoolStudent: req.SchoolStudent,
    Employer: req.Employer,
    AttendanceType: req.AttendanceType,
    Remedy: req.Remedy,
    UnitOfMeasure: req.UnitOfMeasure,
    momentAtual: moment().format('YYYY-MM-DDT00:00')
  })
}).get('/', ssc.get, function(req, res, next) {
  res.render('attendence/list', {
    sess: req.session,
    redirectUrl: req.originalUrl
  })
})

module.exports = router
