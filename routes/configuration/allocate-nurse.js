const express = require('express')
const i18n = require('i18n')

const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SickBayAreaControl = require(process.env.PWD + '/controls/SickBayAreaControl')
const SickBayNurseAreaControl = require(process.env.PWD + '/controls/SickBayNurseAreaControl')
const UserControl = require(process.env.PWD + '/controls/UserControl')

const router = express.Router()

router.get('/', SickBayAreaControl.get, UserControl.getNurses, function(req, res, next) {
  let flashMsg = req.session.flashMsg
  if(flashMsg) delete req.session.flashMsg
  res.render('configuration/allocate-nurse', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    sickBayAreas: req.sickBayAreas,
    nurses: req.nurses,
    flashMsg
  })
})

router.post('/', SickBayNurseAreaControl.save, function(req, res, next) {
  req.session.flashMsg = {
    txtMsg: __('messages.sucessAllocate'),
    styleMsg: 'alert-success'
  }
  res.redirect('/configuration/allocate-nurse')
})

module.exports = router
