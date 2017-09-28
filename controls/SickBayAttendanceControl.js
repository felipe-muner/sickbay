const async = require('async')
const moment = require('moment')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SickBayAttendance = require(process.env.PWD + '/models/SickBayAttendance')
const SickBayAttendanceMedication = require(process.env.PWD + '/models/SickBayAttendanceMedication')
const SickBayRemedy = require(process.env.PWD + '/models/SickBayRemedy')
const UnitOfMeasure = require(process.env.PWD + '/models/UnitOfMeasure')
const SickBayAttendanceType = require(process.env.PWD + '/models/SickBayAttendanceType')
const SickBayArea = require(process.env.PWD + '/models/SickBayArea')
const User = require(process.env.PWD + '/models/User')
const SickBayReturnAttendance = require(process.env.PWD + '/models/SickBayReturnAttendance')

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
      attendances
        .map((e) => {
          e.dataValues.Schedule = moment(e.dataValues.Schedule).format('DD/MM/YYYY HH:mm')
        })

      if(!req.session.allUnits) {
        attendances = attendances.filter(e => parseInt(e.dataValues.SickBayArea_ID) === req.session.sickBayAreaID)
      }

      req.attendances = attendances
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
}

module.exports = new SickBayAttendanceControl()
