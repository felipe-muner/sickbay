const express = require('express')
const i18n = require('i18n')

const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SchoolStudent = require(process.env.PWD + '/controls/SchoolStudent')

const router = express.Router()

router.get('/new', SchoolStudent.get, function(req, res, next) {
  console.log(req.SchoolStudent)
  res.render('medication-controlled/new', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    SchoolStudent: req.SchoolStudent
  })
}).get('/', SchoolStudent.get, function(req, res, next) {
  res.render('medication-controlled/list', {
    sess: req.session,
    redirectUrl: req.originalUrl
  })
})

module.exports = router
