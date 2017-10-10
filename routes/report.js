const express = require('express')
const router = express.Router()
const moment = require('moment')

const satc = require(process.env.PWD + '/controls/SickBayAttendanceTypeControl')
const sbac = require(process.env.PWD + '/controls/SickBayAttendanceControl')
const sickbayArea = require(process.env.PWD + '/controls/SickBayAreaControl')
const rc = require(process.env.PWD + '/controls/ReportControl')

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
}).post('/generate', sbac.getBetweenDates, sickbayArea.get, rc.adjustReport, rc.generate)

module.exports = router
