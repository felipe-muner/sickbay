const moment = require('moment')
const async = require('async')
const cheerio = require('cheerio')
const fs = require('fs')
const pdf = require('html-pdf')
const A4option = require(process.env.PWD + '/views/medication-controlled/A4config')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SickBayMedicationControlled = require(process.env.PWD + '/models/SickBayMedicationControlled')
const SickBayMedicationSchedule = require(process.env.PWD + '/models/SickBayMedicationSchedule')
const Util = require(process.env.PWD + '/util/Util')

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
    const SchoolStudent = req.SchoolStudent
    SickBayMedicationControlled.findAll({
      include:{
        model: SickBayMedicationSchedule
      }
    }).then( medCtrl => {
      medCtrl
        .map((e) => {
          e.StartFormated = moment(e.dataValues.Start).format('DD/MM/YYYY')
          e.EndFormated = moment(e.dataValues.End).format('DD/MM/YYYY')
          e.SchoolStudent = SchoolStudent.filter(obj => parseInt(obj.MATRICULA) === parseInt(e.dataValues.Student_Matricula))[0]
        })

      if(!req.session.allUnits) {
        medCtrl = medCtrl.filter(e => parseInt(e.dataValues.SickBayArea_ID) === req.session.sickBayAreaID)
      }

      req.medCtrl = medCtrl
      req.session.medCtrlForExport = medCtrl
      next()
    }).catch(err => {next(err)})
  }

  this.getById = function(req, res, next){
    const SchoolStudent = req.SchoolStudent
    SickBayMedicationControlled.findOne({
      include:{
        model: SickBayMedicationSchedule
      },
      where: {SickBayMedicationControlledID: req.body.MedicationControlledID}
    }).then( medCtrl => {

      medCtrl.SchoolStudent = SchoolStudent.filter(e => parseInt(e.MATRICULA) === parseInt(medCtrl.Student_Matricula))[0]

      medCtrl.SickBayMedicationSchedules.map(obj => {
        obj.MedicationDateFormated = moment(obj.MedicationDate).format('DD/MM/YYYY')
      })

      req.medCtrl = medCtrl
      next()
    }).catch(err => {next(err)})
  }

  this.findByFilter = function(req,res,next) {
    const SchoolStudent = req.SchoolStudent
    SickBayMedicationControlled.findAll({
      include:{
        model: SickBayMedicationSchedule
      }
    }).then( medCtrl => {
      medCtrl
        .map((e) => {
          e.StartFormated = moment(e.dataValues.Start).format('DD/MM/YYYY')
          e.EndFormated = moment(e.dataValues.End).format('DD/MM/YYYY')
          e.SchoolStudent = SchoolStudent.filter(obj => parseInt(obj.MATRICULA) === parseInt(e.dataValues.Student_Matricula))[0]
        })

      medCtrl = medCtrl.filter(e => {
        let rangeStart = (moment(e.dataValues.Start).isSameOrAfter(req.body.initialDate,'day') && moment(e.dataValues.Start).isSameOrBefore(req.body.finalDate,'day'));
        let rangeEnd = (moment(e.dataValues.End).isSameOrAfter(req.body.initialDate,'day') && moment(e.dataValues.End).isSameOrBefore(req.body.finalDate,'day'));
        return (rangeStart || rangeEnd)
      })

      if(!req.session.allUnits) medCtrl = medCtrl.filter(e => parseInt(e.dataValues.SickBayArea_ID) === req.session.sickBayAreaID)
      if(req.body.studentMatricula !== '') medCtrl = medCtrl.filter(e => parseInt(e.SchoolStudent.MATRICULA) === parseInt(req.body.studentMatricula))
      if(req.body.studentName !== '') medCtrl = medCtrl.filter(e => e.SchoolStudent.NOME.replace('  ', ' ').toLowerCase() === req.body.studentName.toLowerCase())

      req.medCtrl = medCtrl
      req.session.medCtrlForExport = medCtrl
      next()
    }).catch(err => {next(err)})
  }

  this.exportPDF = function(req, res, next) {
    const SchoolStudent = req.SchoolStudent
    const medCtrl = req.session.medCtrlForExport
    let tbody = ''
    fs.readFile(process.env.PWD + '/views/medication-controlled/template.html', {encoding: 'utf-8'}, function (err, html) {
      if(err) {
        next(err)
      } else {
        const $ = cheerio.load(html)

        medCtrl.forEach((e, i) => {
          e.SchoolStudent = SchoolStudent.filter(obj => parseInt(obj.MATRICULA) === parseInt(e.Student_Matricula))[0]
          let StartFormated = moment(e.Start).format('DD/MM/YYYY')
          let EndFormated = moment(e.End).format('DD/MM/YYYY')
          let Hr2 = e.Hr2 ? e.Hr2 : ''
          let Hr3 = e.Hr3 ? e.Hr3 : ''
          let Hr4 = e.Hr4 ? e.Hr4 : ''

          tbody = i%2 ? tbody + '<tr>' : tbody + '<tr style="background-color:#ddd;">'
          tbody = tbody +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+e.SickBayMedicationControlledID+'</td>' +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+e.SchoolStudent.MATRICULA+' - '+Util.toTitleCase(e.SchoolStudent.NOME)+'</td>' +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+StartFormated+'</td>' +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+EndFormated+'</td>' +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+e.Hr1+'</td>' +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+Hr2+'</td>' +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+Hr3+'</td>' +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+Hr4+'</td>' +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+Util.toTitleCase(e.Responsible)+'</td>' +
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+e.Note+'</td>' +
            '<td style="border:1px solid black;border-top:0px;">'+e.Type+'</td>' +
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

module.exports = new SickBayMedicationControlledControl()
