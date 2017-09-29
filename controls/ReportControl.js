const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const A4option = require(process.env.PWD + '/views/report/A4config')
const pdf = require('html-pdf')
const cheerio = require('cheerio')
const moment = require('moment')
const fs = require('fs')

function ReportControl() {
  this.generate = function(req, res, next) {
    fs.readFile(process.env.PWD + '/views/report/template.html', {encoding: 'utf-8'}, function (err, html) {
      if(err){
        next(err)
      }else{
        const $ = cheerio.load(html)

        let enfermaria = ('' === req.body.SickbayArea) ? 'Todas' : req.body.SickbayArea
        $('#enfermaria').text(enfermaria)
        $('#periodoReport').text(moment(req.body.StartDate).format('DD/MM/YYYY') + ' até ' + moment(req.body.EndDate).format('DD/MM/YYYY'))

        pdf.create($.html(), A4option).toFile(function(err, pdfFile) {
          if (err) return console.log(err);
          console.log(pdfFile);
          // res.download(pdfFile.filename, new Date() + 'report.pdf')
          req.REPsickbay = pdfFile.filename
          next()
        })
      }
    })
  }
}

module.exports = new ReportControl()
