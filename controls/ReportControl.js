const cheerio = require('cheerio')
const fs = require('fs')
const pdf = require('html-pdf')
const A4option = require(process.env.PWD + '/views/report/A4config')
const moment = require('moment')

function ReportControl() {
  this.adjustReport = function(req, res, next) {
    let matrizReport = {
      'internalIncident':{
        "BotaPreNurseryNursery":0,
        "BotafogoLP":0,
        "BotafogoUP":0,
        "Urca":0,
        "BarraPreNurseryNursery":0,
        "BarraLP":0,
        "BarraUP":0,
        "BarraSeniors":0
      },
      'externalIncident':{
        "BotaPreNurseryNursery":0,
        "BotafogoLP":0,
        "BotafogoUP":0,
        "Urca":0,
        "BarraPreNurseryNursery":0,
        "BarraLP":0,
        "BarraUP":0,
        "BarraSeniors":0
      },
      'accident':{
        "BotaPreNurseryNursery":0,
        "BotafogoLP":0,
        "BotafogoUP":0,
        "Urca":0,
        "BarraPreNurseryNursery":0,
        "BarraLP":0,
        "BarraUP":0,
        "BarraSeniors":0
      },
      'visit':{
        "BotaPreNurseryNursery":0,
        "BotafogoLP":0,
        "BotafogoUP":0,
        "Urca":0,
        "BarraPreNurseryNursery":0,
        "BarraLP":0,
        "BarraUP":0,
        "BarraSeniors":0
      },
    }

    req.QueryReport.map(e => {
      if('Botafogo' === e.UnitSchool.trim()) {
        if(['Pre-Nursery', 'Nursery'].includes(e.YearGroup.trim())) {
          matrizReport[e.Name].BotaPreNurseryNursery += e.Total
        } else if(['Reception', 'Infant I', 'Infant II'].includes(e.YearGroup.trim())) {
          matrizReport[e.Name].BotafogoLP += e.Total
        } else {
          matrizReport[e.Name].BotafogoUP += e.Total
        }
      } else if('Urca' === e.UnitSchool.trim()) {
        matrizReport[e.Name].Urca += e.Total
      } else if('Barra' === e.UnitSchool.trim()) {
        if(['Pre-Nursery', 'Nursery'].includes(e.YearGroup.trim())) {
          matrizReport[e.Name].BarraPreNurseryNursery += e.Total
        } else if(['Reception', 'Infant I', 'Infant II'].includes(e.YearGroup.trim())) {
          matrizReport[e.Name].BarraLP += e.Total
        } else if(['Class 1', 'Class 2','Class 3','Class 4', 'Class 5'].includes(e.YearGroup.trim())) {
          matrizReport[e.Name].BarraUP += e.Total
        } else {
          matrizReport[e.Name].BarraSeniors += e.Total
        }
      }
    })

    req.matrizReport = matrizReport
    next()
  }

  this.generate = function(req, res, next) {
    let report = req.matrizReport
    let enfermaria = ('' === req.body.SickbayArea) ? 'All' : req.body.SickbayArea
    let types = [
      { id: 1, name: 'internalIncident'},
      { id: 2, name: 'externalIncident'},
      { id: 3, name: 'accident'},
      { id: 4, name: 'visit'}
    ]
    fs.readFile(process.env.PWD + '/views/report/template.html', {encoding: 'utf-8'}, function (err, html) {
      if(err) {
        next(err)
      } else {
        const $ = cheerio.load(html)

        $('#enfermaria').text(enfermaria)
        $('#periodoReport').text(moment(req.body.StartDate).format('DD/MM/YYYY') + ' to ' + moment(req.body.EndDate).format('DD/MM/YYYY'))

        types.forEach(e => {
          let total = report[e.name].BotaPreNurseryNursery + report[e.name].BotafogoLP +
                      report[e.name].BotafogoUP + report[e.name].Urca +
                      report[e.name].BarraPreNurseryNursery + report[e.name].BarraLP +
                      report[e.name].BarraUP + report[e.name].BarraSeniors

          $('#BotaPreNurseryNursery-' + e.id).text(report[e.name].BotaPreNurseryNursery)
          $('#BotafogoLP-' + e.id).text(report[e.name].BotafogoLP)
          $('#BotafogoUP-' + e.id).text(report[e.name].BotafogoUP)
          $('#Urca-' + e.id).text(report[e.name].Urca)
          $('#BarraPreNurseryNursery-' + e.id).text(report[e.name].BarraPreNurseryNursery)
          $('#BarraLP-' + e.id).text(report[e.name].BarraLP)
          $('#BarraUP-' + e.id).text(report[e.name].BarraUP)
          $('#BarraSeniors-' + e.id).text(report[e.name].BarraSeniors)
          $('#total-' + e.id).text(total)
        })

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

module.exports = new ReportControl()
