const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const A4option = require(process.env.PWD + '/views/report/A4config')
const pdf = require('html-pdf')
const cheerio = require('cheerio')
const moment = require('moment')
const fs = require('fs')

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

    req.QueryReport.map((e) =>{
      if('internalIncident' === e.Name){
        if('Botafogo' === e.UnitSchool) {
          if(['Pre-Nursery', 'Nursery'].includes(e.YearGroup)){
            matrizReport[e.Name].BotaPreNurseryNursery += e.Total
          }else if(['Reception', 'Infant I', 'Infant II'].includes(e.YearGroup)){
            matrizReport[e.Name].BotafogoLP += e.Total
          }else{
            matrizReport[e.Name].BotafogoUP += e.Total
          }
        }else if('Urca' === e.UnitSchool) {
          matrizReport[e.Name].Urca += e.Total
        }else if('Barra' === e.UnitSchool) {
          if(['Pre-Nursery', 'Nursery'].includes(e.YearGroup)){
            matrizReport[e.Name].BarraPreNurseryNursery += e.Total
          }else if(['Reception', 'Infant I', 'Infant II'].includes(e.YearGroup)){
            matrizReport[e.Name].BarraLP += e.Total
          }else if(['Class 1', 'Class 2','Class 3','Class 4', 'Class 5'].includes(e.YearGroup)){
            matrizReport[e.Name].BarraUP += e.Total
          }else{
            matrizReport[e.Name].BarraSeniors += e.Total
          }
        }
      }else if('externalIncident' === e.Name){
        if('Botafogo' === e.UnitSchool) {
          if(['Pre-Nursery', 'Nursery'].includes(e.YearGroup)){
            matrizReport[e.Name].BotaPreNurseryNursery += e.Total
          }else if(['Reception', 'Infant I', 'Infant II'].includes(e.YearGroup)){
            matrizReport[e.Name].BotafogoLP += e.Total
          }else{
            matrizReport[e.Name].BotafogoUP += e.Total
          }
        }else if('Urca' === e.UnitSchool) {
          matrizReport[e.Name].Urca += e.Total
        }else if('Barra' === e.UnitSchool) {
          if(['Pre-Nursery', 'Nursery'].includes(e.YearGroup)){
            matrizReport[e.Name].BarraPreNurseryNursery += e.Total
          }else if(['Reception', 'Infant I', 'Infant II'].includes(e.YearGroup)){
            matrizReport[e.Name].BarraLP += e.Total
          }else if(['Class 1', 'Class 2','Class 3','Class 4', 'Class 5'].includes(e.YearGroup)){
            matrizReport[e.Name].BarraUP += e.Total
          }else{
            matrizReport[e.Name].BarraSeniors += e.Total
          }
        }
      }else if('accident' === e.Name){
        if('Botafogo' === e.UnitSchool) {
          if(['Pre-Nursery', 'Nursery'].includes(e.YearGroup)){
            matrizReport[e.Name].BotaPreNurseryNursery += e.Total
          }else if(['Reception', 'Infant I', 'Infant II'].includes(e.YearGroup)){
            matrizReport[e.Name].BotafogoLP += e.Total
          }else{
            matrizReport['accident'].BotafogoUP += e.Total
          }
        }else if('Urca' === e.UnitSchool) {
          matrizReport[e.Name].Urca += e.Total
        }else if('Barra' === e.UnitSchool) {
          if(['Pre-Nursery', 'Nursery'].includes(e.YearGroup)){
            matrizReport[e.Name].BarraPreNurseryNursery += e.Total
          }else if(['Reception', 'Infant I', 'Infant II'].includes(e.YearGroup)){
            matrizReport[e.Name].BarraLP += e.Total
          }else if(['Class 1', 'Class 2','Class 3','Class 4', 'Class 5'].includes(e.YearGroup)){
            matrizReport[e.Name].BarraUP += e.Total
          }else{
            matrizReport[e.Name].BarraSeniors += e.Total
          }
        }
      }else if('visit' === e.Name){
        if('Botafogo' === e.UnitSchool) {
          if(['Pre-Nursery', 'Nursery'].includes(e.YearGroup)){
            matrizReport[e.Name].BotaPreNurseryNursery += e.Total
          }else if(['Reception', 'Infant I', 'Infant II'].includes(e.YearGroup)){
            matrizReport[e.Name].BotafogoLP += e.Total
          }else{
            matrizReport[e.Name].BotafogoUP += e.Total
          }
        }else if('Urca' === e.UnitSchool) {
          matrizReport[e.Name].Urca += e.Total
        }else if('Barra' === e.UnitSchool) {
          if(['Pre-Nursery', 'Nursery'].includes(e.YearGroup)){
            matrizReport[e.Name].BarraPreNurseryNursery += e.Total
          }else if(['Reception', 'Infant I', 'Infant II'].includes(e.YearGroup)){
            matrizReport[e.Name].BarraLP += e.Total
          }else if(['Class 1', 'Class 2','Class 3','Class 4', 'Class 5'].includes(e.YearGroup)){
            matrizReport[e.Name].BarraUP += e.Total
          }else{
            matrizReport[e.Name].BarraSeniors += e.Total
          }
        }
      }
    })
    req.matrizReport = matrizReport
    next()
  }

  this.generate = function(req, res, next) {
    fs.readFile(process.env.PWD + '/views/report/template.html', {encoding: 'utf-8'}, function (err, html) {
      if(err){
        next(err)
      }else{
        const $ = cheerio.load(html)

        let enfermaria = ('' === req.body.SickbayArea) ? 'Todas' : req.body.SickbayArea
        $('#enfermaria').text(enfermaria)
          //colocar id nas colunas de numeros e adicionar pelo obj req.matrizReport

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
