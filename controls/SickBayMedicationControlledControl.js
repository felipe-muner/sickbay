const moment = require('moment')
const async = require('async')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SickBayMedicationControlled = require(process.env.PWD + '/models/SickBayMedicationControlled')
const SickBayMedicationSchedule = require(process.env.PWD + '/models/SickBayMedicationSchedule')
const SchoolStudent = require(process.env.PWD + '/models/SchoolStudent')

function SickBayMedicationControlledControl() {
  this.new = function(req, res, next) {
    req.body.Nurse_Matricula = req.session.enrollment
    req.body.SickBayArea_ID = req.session.sickBayAreaID
    req.body.Hr2 = req.body.Hr2 !== '' ? req.body.Hr2 : null
    req.body.Hr3 = req.body.Hr3 !== '' ? req.body.Hr3 : null
    req.body.Hr4 = req.body.Hr4 !== '' ? req.body.Hr4 : null
    req.body.DoctorName = req.body.DoctorName !== '' ? req.body.DoctorName : null
    req.body.DoctorContact = req.body.DoctorContact !== '' ? req.body.DoctorContact : null

    let arrayDatesDesired = []
    for (let m = moment(req.body.Start); m.isSameOrBefore(req.body.End,'day'); m.add(1, 'days')) {
      arrayDatesDesired.push(m.format('YYYY-MM-DD'))
    }

    SickBayMedicationControlled.create(req.body).then(medCtrl => {
      async.forEach((arrayDatesDesired), function(date, callback) {
        SickBayMedicationSchedule.create({
          SickBayMedicationControlled_ID: medCtrl.SickBayMedicationControlledID,
          MedicationDate: date,
          Hr1: req.body.Hr1,
          Hr2: req.body.Hr2 !== '' ? req.body.Hr2 : null,
          Hr3: req.body.Hr3 !== '' ? req.body.Hr3 : null,
          Hr4: req.body.Hr4 !== '' ? req.body.Hr4 : null
        }).then(medSchedule => {
          callback()
        }).catch(err => { next(err) })
      }, function(err) {
        next()
      })
    }).catch(err => { next(err) })
  }

  this.get = function(req,res,next){
    SickBayMedicationControlled.findAll({
      include:[{
        model: SickBayMedicationSchedule
      },{
        model: SchoolStudent
      }]
    }).then( medCtrl => {
      medCtrl
        .map((e) => {
          e.StartFormated = moment(e.dataValues.Start).format('DD/MM/YYYY')
          e.EndFormated = moment(e.dataValues.End).format('DD/MM/YYYY')
        })

      if(!req.session.allUnits) {
        medCtrl = medCtrl.filter(e => parseInt(e.dataValues.SickBayArea_ID) === req.session.sickBayAreaID)
      }

      req.medCtrl = medCtrl
      next()
    }).catch(err => {next(err)})
  }

  this.getById = function(req, res, next){
    SickBayMedicationControlled.findOne({
      include:[{
        model: SickBayMedicationSchedule
      },{
        model: SchoolStudent
      }],
      where: {SickBayMedicationControlledID: req.body.MedicationControlledID}
    }).then( medCtrl => {

      medCtrl.SickBayMedicationSchedules.map(obj => {
        obj.MedicationDateFormated = moment(obj.MedicationDate).format('DD/MM/YYYY')
      })

      req.medCtrl = medCtrl
      next()
    }).catch(err => {next(err)})
  }

  this.findByFilter = function(req,res,next) {
    SickBayMedicationControlled.findAll({
      include:[{
        model: SickBayMedicationSchedule
      },{
        model: SchoolStudent
      }]
    }).then( medCtrl => {
      medCtrl
        .map((e) => {
          e.StartFormated = moment(e.dataValues.Start).format('DD/MM/YYYY')
          e.EndFormated = moment(e.dataValues.End).format('DD/MM/YYYY')
        })

      medCtrl = medCtrl.filter(e => {
        let rangeStart = (moment(e.dataValues.Start).isSameOrAfter(req.body.initialDate,'day') && moment(e.dataValues.Start).isSameOrBefore(req.body.finalDate,'day'));
        let rangeEnd = (moment(e.dataValues.End).isSameOrAfter(req.body.initialDate,'day') && moment(e.dataValues.End).isSameOrBefore(req.body.finalDate,'day'));
        return (rangeStart || rangeEnd)
      })

      if(!req.session.allUnits) medCtrl = medCtrl.filter(e => parseInt(e.dataValues.SickBayArea_ID) === req.session.sickBayAreaID)
      if(req.body.studentMatricula !== '') medCtrl = medCtrl.filter(e => e.dataValues.SchoolStudent.Matricula === parseInt(req.body.studentMatricula))
      if(req.body.studentName !== '') medCtrl = medCtrl.filter(e => e.dataValues.SchoolStudent.Nome.replace('  ', ' ').toLowerCase() === req.body.studentName.toLowerCase())

      req.medCtrl = medCtrl
      next()
    }).catch(err => {next(err)})
  }
}

module.exports = new SickBayMedicationControlledControl()
