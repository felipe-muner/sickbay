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
const sickbayArea = require(process.env.PWD + '/controls/SickBayAreaControl')
const rc = require(process.env.PWD + '/controls/ReportControl')
const moment = require('moment')

const router = express.Router()

router.get('/', sickbayArea.get, satc.get, function(req, res, next) {
  let flashMsg = req.session.flashMsg
  if(flashMsg) delete req.session.flashMsg
  console.log('entrei')
  res.render('report/report', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    SickArea: req.sickBayAreas,
    AttendanceType: req.AttendanceType,
    firstDayMonth: moment().startOf('month').format('YYYY-MM-DD'),
    lastDayMonth: moment().endOf('month').format('YYYY-MM-DD')
  })
}).post('/generate', sbac.getBetweenDates, rc.adjustReport, rc.generate)

module.exports = router
