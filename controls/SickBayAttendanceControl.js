const async = require('async')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SickBayAttendance = require(process.env.PWD + '/models/SickBayAttendance')
const SickBayAttendanceMedication = require(process.env.PWD + '/models/SickBayAttendanceMedication')
const SickBayRemedy = require(process.env.PWD + '/models/SickBayRemedy')
const UnitOfMeasure = require(process.env.PWD + '/models/UnitOfMeasure')
const SickBayAttendanceType = require(process.env.PWD + '/models/SickBayAttendanceType')
const SickBayArea = require(process.env.PWD + '/models/SickBayArea')
const User = require(process.env.PWD + '/models/User')

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
      }]
    }).then(attendances => {
      req.attendances = attendances
      next()
    }).catch(err => { next(err) })
  }
}

module.exports = new SickBayAttendanceControl()
