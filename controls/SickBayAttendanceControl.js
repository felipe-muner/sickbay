const async = require('async')
const moment = require('moment')
const cheerio = require('cheerio')
const fs = require('fs')
const pdf = require('html-pdf')
const A4option = require(process.env.PWD + '/views/attendance/A4config')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SickBayAttendance = require(process.env.PWD + '/models/SickBayAttendance')
const SickBayAttendanceMedication = require(process.env.PWD + '/models/SickBayAttendanceMedication')
const SickBayRemedy = require(process.env.PWD + '/models/SickBayRemedy')
const UnitOfMeasure = require(process.env.PWD + '/models/UnitOfMeasure')
const SickBayAttendanceType = require(process.env.PWD + '/models/SickBayAttendanceType')
const SickBayArea = require(process.env.PWD + '/models/SickBayArea')
const User = require(process.env.PWD + '/models/User')
const SickBayReturnAttendance = require(process.env.PWD + '/models/SickBayReturnAttendance')
const Util = require(process.env.PWD + '/util/Util')

function SickBayAttendanceControl() {
  this.new = function(req, res, next) {
    let ThuthPatient = JSON.parse(req.body.ThuthPatient)
    let listMedication = JSON.parse(req.body.listMedication)
    SickBayAttendance.create({
      Schedule: req.body.HourAttendance,
      Nurse_Matricula: req.session.enrollment,
      SickBayArea_ID: req.session.sickBayAreaID,
      SickBayAttendanceType_ID: parseInt(req.body.SickBayAttendanceType_ID),
      PatientType: ThuthPatient.Type,
      Patient_Matricula: ThuthPatient.Matricula ? ThuthPatient.Matricula : null,
      PatientName: ThuthPatient.Name ? ThuthPatient.Name : null,
      Allergy: ThuthPatient.Alergy ? ThuthPatient.Alergy : null,
      YearGroup: ThuthPatient.YearGroup ? ThuthPatient.YearGroup : null,
      Class: ThuthPatient.Class ? ThuthPatient.Class : null,
      UnitSchool: ThuthPatient.Filial ? ThuthPatient.Filial : null,
      Reason: req.body.Note,
      Procedure: req.body.Procedure
    }).then(attendance => {
      async.forEach((listMedication), function(obj, callback) {
        SickBayAttendanceMedication.create({
          SickBayAttendance_ID: attendance.SickBayAttendanceID,
          SickBayRemedy_ID: parseInt(obj.MedicationID),
          Amount: parseFloat(obj.Amount),
          UnitOfMeasure_ID: parseInt(obj.UnitOfMeasureID)
        }).then(attendanceMed => {
          callback()
        }).catch(err => { next(err) })
      }, function(err) {
        next()
      })
    }).catch(err => { next(err) })
  }

  this.get = function(req, res, next) {
    SickBayAttendance.findAll({
      include: [{
          model: SickBayAttendanceMedication,
          include: [{
            model: SickBayRemedy
          }, {
            model: UnitOfMeasure
          }]
        }, {
          model: SickBayAttendanceType
        }, {
          model: SickBayArea
        }, {
          model: User
      }],
      order: [['Schedule', 'DESC']]
    }).then(attendances => {
      attendances
        .map((e) => {
          e.ScheduleFormated = moment(e.dataValues.Schedule).format('DD/MM/YYYY HH:mm')
        })

      if(req.session.profileID === parseInt(process.env.NURSE_PROFILE_ID)) {
        attendances = attendances.filter(e => parseInt(e.dataValues.SickBayArea_ID) === req.session.sickBayAreaID)
      } else {
        attendancesArray = []
        attendances.forEach(e => {
          if(req.session.accessBotafogo && (e.SickBayArea.Unit_ID === 1)) attendancesArray.push(e)
          if(req.session.accessUrca && (e.SickBayArea.Unit_ID === 2)) attendancesArray.push(e)
          if(req.session.accessBarra && (e.SickBayArea.Unit_ID === 3)) attendancesArray.push(e)
        })
        attendances = attendancesArray
      }

      req.attendances = attendances
      req.session.attendancesForExport = attendances
      next()
    }).catch(err => { next(err) })
  }

  this.getById = function (req, res, next){
    SickBayAttendance.findOne({
      include: [{
          model: SickBayAttendanceMedication,
          include: [{
            model: SickBayRemedy
          }, {
            model: UnitOfMeasure
          }]
        }, {
          model: SickBayAttendanceType
        }, {
          model: SickBayArea
        }, {
          model: User
        }, {
          model: SickBayReturnAttendance,
          include: { model: User }
      }],
      where: {SickBayAttendanceID:req.body.SickBayAttendanceID}
    }).then(attendance => {
      attendance.dataValues.Schedule = moment(attendance.dataValues.Schedule).format('DD/MM/YYYY HH:mm')

      attendance.dataValues.SickBayReturnAttendances
        .map((e) => {
          e.dataValues.Schedule = moment(e.dataValues.Schedule).format('DD/MM/YYYY HH:mm')
        })

      req.attendance = attendance
      next()
    }).catch(err => { next(err) })
  }

  this.findByFilter = function(req, res, next) {
    SickBayAttendance.findAll({
      include: [{
          model: SickBayAttendanceMedication,
          include: [{
            model: SickBayRemedy
          }, {
            model: UnitOfMeasure
          }]
        }, {
          model: SickBayAttendanceType
        }, {
          model: SickBayArea
        }, {
          model: User
      }],
      order: [['Schedule', 'DESC']]
    }).then(attendances => {
      attendances
        .map((e) => {
          e.ScheduleFormated = moment(e.dataValues.Schedule).format('DD/MM/YYYY HH:mm')
        })

      attendances = attendances.filter(e => (moment(e.dataValues.Schedule).isSameOrAfter(req.body.initialDate,'day') && moment(e.dataValues.Schedule).isSameOrBefore(req.body.finalDate,'day')))

      if(req.body.studentPatient !== '') attendances = attendances.filter(e => parseInt(e.dataValues.Patient_Matricula) === parseInt(req.body.studentPatient))
      if(req.body.employeePatient !== '') attendances = attendances.filter(e => parseInt(e.dataValues.Patient_Matricula) === parseInt(req.body.employeePatient))
      if(req.body.otherPatient !== '') attendances = attendances.filter(e => e.dataValues.PatientName.toLowerCase() === req.body.otherPatient.toLowerCase())
      if(req.body.nurseMatricula !== '') attendances = attendances.filter(e => e.dataValues.usuario.matricula === parseInt(req.body.nurseMatricula))
      if(req.body.nurseName !== '') attendances = attendances.filter(e => e.dataValues.usuario.nomeusuario.replace('  ', ' ').toLowerCase() === req.body.nurseName.toLowerCase())
      if(req.body.type !== '') attendances = attendances.filter(e => e.dataValues.SickBayAttendanceType_ID === parseInt(req.body.type))
      if(req.body.sickBay !== '') attendances = attendances.filter(e => e.dataValues.SickBayArea_ID === parseInt(req.body.sickBay))

      if(req.session.profileID === parseInt(process.env.NURSE_PROFILE_ID)) {
        attendances = attendances.filter(e => parseInt(e.dataValues.SickBayArea_ID) === req.session.sickBayAreaID)
      } else {
        attendancesArray = []
        attendances.forEach(e => {
          if(req.session.accessBotafogo && (e.SickBayArea.Unit_ID === 1)) attendancesArray.push(e)
          if(req.session.accessUrca && (e.SickBayArea.Unit_ID === 2)) attendancesArray.push(e)
          if(req.session.accessBarra && (e.SickBayArea.Unit_ID === 3)) attendancesArray.push(e)
        })
        attendances = attendancesArray
      }

      req.attendances = attendances
      req.session.attendancesForExport = attendances
      next()
    }).catch(err => { next(err) })
  }

  this.getBetweenDates = function(req, res, next) {
    let query = 'SELECT '+
                      'UnitSchool, '+
                      'YearGroup, '+
                      'Name, '+
                      'COUNT(Class) as Total '+
                    'FROM '+
                      'SickbayAttendance '+
                    'INNER JOIN SickbayAttendanceType ON SickbayAttendance.SickBayAttendanceType_ID = SickbayAttendanceType.SickBayAttendanceTypeID '+
                    'WHERE '+
                      'PatientType = "Student" AND '+
                      'DATE(Schedule) between $StartDate AND $EndDate '
    if(req.body.SickbayArea) query = query + 'AND SickBayArea_ID = ' + req.body.SickbayArea
    query = query + ' GROUP BY Name, UnitSchool, YearGroup;'

    sequelize.query(query,{
      bind:{StartDate: req.body.StartDate, EndDate: req.body.EndDate},
      type: sequelize.QueryTypes.SELECT
    }).then(result => {
      req.QueryReport = result
      next()
    }).catch(err => { next(err) })
  }

  this.exportPDF = function(req, res, next) {
    const attendances = req.session.attendancesForExport
    let tbody = ''
    fs.readFile(process.env.PWD + '/views/attendance/template.html', {encoding: 'utf-8'}, function (err, html) {
      if(err) {
        next(err)
      } else {
        const $ = cheerio.load(html)

        attendances.forEach((e, i) => {
          let ScheduleFormated = moment(e.Schedule).format('DD/MM/YYYY HH:mm')
          let PatientName = e.Patient_Matricula ? e.Patient_Matricula+' - '+Util.toTitleCase(e.PatientName) : Util.toTitleCase(e.PatientName)

          tbody = i%2 ? tbody + '<tr>' : tbody + '<tr style="background-color:#ddd;">'
          tbody = tbody +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+e.SickBayAttendanceID+'</td>' +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+ScheduleFormated+'</td>' +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+e.SickBayArea.Name+'</td>' +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+__(e.SickBayAttendanceType.Name)+'</td>' +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+PatientName+'</td>' +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+e.usuario.matricula+' - '+Util.toTitleCase(e.usuario.nomeusuario)+'</td>' +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+e.Reason+'</td>' +
            '<td style="border:1px solid black;border-top:0px;">'+e.Procedure+'</td>' +
          '</tr>'
        })

        $('#tbody').html(tbody)

        pdf.create($.html(), A4option).toFile(function(err, pdfFile) {
          console.log(pdfFile)
          if (err) return console.log(err)
          fs.readFile(pdfFile.filename, function(err, data) {
            if(err) {
              console.log("Error: " + err)
              res.render('error', {error: err, redirectUrl: req.originalUrl})
            } else {
              console.log("Success")
              res.contentType("application/pdf")
              res.send(data)
            }
          })
        })
      }
    })
  }
}

module.exports = new SickBayAttendanceControl()
