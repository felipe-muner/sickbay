const moment = require('moment')
const async = require('async')
const cheerio = require('cheerio')
const fs = require('fs')
const pdf = require('html-pdf')
const A4option = require(process.env.PWD + '/views/medication-controlled/A4config')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SickBayArea = require(process.env.PWD + '/models/SickBayArea')
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
      include: [{
        model: SickBayMedicationSchedule
      }, {
        model: SickBayArea
      }],
      order: [['Hr1', 'ASC'], ['Hr2', 'ASC'], ['Hr3', 'ASC'], ['Hr4', 'ASC']]
    }).then( medCtrl => {
      medCtrl
        .map((e) => {
          e.StartFormated = moment(e.dataValues.Start).format('DD/MM/YYYY')
          e.EndFormated = moment(e.dataValues.End).format('DD/MM/YYYY')
          e.SchoolStudent = SchoolStudent.filter(obj => parseInt(obj.MATRICULA) === parseInt(e.dataValues.Student_Matricula))[0]
        })

      medCtrl.sort((a, b) => {
        let nameA = a.SchoolStudent.NOME.toUpperCase()
        let nameB = b.SchoolStudent.NOME.toUpperCase()

        if (nameA < nameB) return -1
        if (nameA > nameB) return 1

        return 0
      })

      // medCtrl.sort((a, b) => (a.Active === b.Active) ? 0 : a.Active ? -1 : 1)

      if(req.session.profileID === parseInt(process.env.NURSE_PROFILE_ID)) {
        medCtrl = medCtrl.filter(e => parseInt(e.dataValues.SickBayArea_ID) === req.session.sickBayAreaID)
      } else {
        medCtrlArray = []
        medCtrl.forEach(e => {
          if(req.session.accessBotafogo && (e.SickBayArea.Unit_ID === 1)) medCtrlArray.push(e)
          if(req.session.accessUrca && (e.SickBayArea.Unit_ID === 2)) medCtrlArray.push(e)
          if(req.session.accessBarra && (e.SickBayArea.Unit_ID === 3)) medCtrlArray.push(e)
        })
        medCtrl = medCtrlArray
      }

      let medCtrlActive = medCtrl.filter(obj => obj.Active === true)
      let medCtrlNotActive = medCtrl.filter(obj => obj.Active === false)

      req.medCtrl = medCtrl
      req.medCtrlActive = medCtrlActive
      req.medCtrlNotActive = medCtrlNotActive
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

      medCtrl.ClosedAtFormated = moment(medCtrl.ClosedAt).format('DD/MM/YYYY HH:mm:ss')

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
      include: [{
        model: SickBayMedicationSchedule
      }, {
        model: SickBayArea
      }],
      order: [['Hr1', 'ASC'], ['Hr2', 'ASC'], ['Hr3', 'ASC'], ['Hr4', 'ASC']]
    }).then( medCtrl => {
      medCtrl
        .map((e) => {
          e.StartFormated = moment(e.dataValues.Start).format('DD/MM/YYYY')
          e.EndFormated = moment(e.dataValues.End).format('DD/MM/YYYY')
          e.SchoolStudent = SchoolStudent.filter(obj => parseInt(obj.MATRICULA) === parseInt(e.dataValues.Student_Matricula))[0]
        })

      medCtrl.sort((a, b) => {
        let nameA = a.SchoolStudent.NOME.toUpperCase()
        let nameB = b.SchoolStudent.NOME.toUpperCase()

        if (nameA < nameB) return -1
        if (nameA > nameB) return 1

        return 0
      })

      // medCtrl.sort((a, b) => (a.Active === b.Active) ? 0 : a.Active ? -1 : 1)

      if(req.body.initialDate !== '') {
        medCtrl = medCtrl.filter(e => {
          let rangeStart = moment(e.dataValues.Start).isSameOrAfter(req.body.initialDate,'day');
          let rangeEnd = moment(e.dataValues.End).isSameOrAfter(req.body.initialDate,'day');
          return (rangeStart || rangeEnd)
        })
      }

      if(req.body.finalDate !== '') {
        medCtrl = medCtrl.filter(e => {
          let rangeStart = moment(e.dataValues.Start).isSameOrBefore(req.body.finalDate,'day');
          let rangeEnd = moment(e.dataValues.End).isSameOrBefore(req.body.finalDate,'day');
          return (rangeStart || rangeEnd)
        })
      }

      if(req.body.active) {
        medCtrl = medCtrl.filter(e => {
          let active = parseInt(req.body.active) ? true : false;
          return e.dataValues.Active === active
        })
      }

      if(req.body.student !== '') medCtrl = medCtrl.filter(e => parseInt(e.SchoolStudent.MATRICULA) === parseInt(req.body.student))

      if(req.session.profileID === parseInt(process.env.NURSE_PROFILE_ID)) {
        medCtrl = medCtrl.filter(e => parseInt(e.dataValues.SickBayArea_ID) === req.session.sickBayAreaID)
      } else {
        medCtrlArray = []
        medCtrl.forEach(e => {
          if(req.session.accessBotafogo && (e.SickBayArea.Unit_ID === 1)) medCtrlArray.push(e)
          if(req.session.accessUrca && (e.SickBayArea.Unit_ID === 2)) medCtrlArray.push(e)
          if(req.session.accessBarra && (e.SickBayArea.Unit_ID === 3)) medCtrlArray.push(e)
        })
        medCtrl = medCtrlArray
      }

      let medCtrlActive = medCtrl.filter(obj => obj.Active === true)
      let medCtrlNotActive = medCtrl.filter(obj => obj.Active === false)

      req.medCtrl = medCtrl
      req.medCtrlActive = medCtrlActive
      req.medCtrlNotActive = medCtrlNotActive
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
          let Active = e.Active ? { label: 'Yes', style: 'color: green;' } : { label: 'No', style: 'color: red;' }

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
            '<td style="border:1px solid black;border-right:0px;border-top:0px;">'+e.Type+'</td>' +
            '<td style="'+Active.style+'text-align: center;border:1px solid black;border-top:0px;">'+Active.label+'</td>' +
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

  this.close = function(req, res, next) {
    SickBayMedicationControlled.update({
      Active: false,
      CloseReason: req.body.CloseReason,
      ClosedAt: moment().format(),
      ClosedNurse: req.session.enrollment
    }, {
      where: { SickBayMedicationControlledID : req.body.medCtrlID }
    }).then(() => {
      next()
    }).catch(err => { next(err) })
  }
}

module.exports = new SickBayMedicationControlledControl()
