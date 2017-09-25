const express = require('express')
const i18n = require('i18n')

const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const ssc = require(process.env.PWD + '/controls/SchoolStudentControl')

const router = express.Router()

router.get('/new', ssc.get, function(req, res, next) {
  console.log(req.SchoolStudent)
  res.render('medication-controlled/new', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    SchoolStudent: req.SchoolStudent
  })
}).get('/', ssc.get, function(req, res, next) {
  res.render('medication-controlled/list', {
    sess: req.session,
    redirectUrl: req.originalUrl
  })
})

module.exports = router
