const express = require('express')
const i18n = require('i18n')

const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const Functionality = require(process.env.PWD + '/models/Functionality')
const FunctionalityControl = require(process.env.PWD + '/controls/FunctionalityControl')
const ProfileSystemAccessControl = require(process.env.PWD + '/controls/ProfileSystemAccessControl')

const router = express.Router()

router.get('/new', FunctionalityControl.get, function(req, res, next) {
  res.render('configuration/profile/new', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    functionalities: req.functionalities
  })
})

router.post('/save', ProfileSystemAccessControl.create, function(req, res, next) {
  req.session.flashMsg = {
    txtMsg: __('messages.sucessCreate'),
    styleMsg: 'alert-success'
  }
  res.redirect('/configuration/profile')
})

router.get('/', ProfileSystemAccessControl.get, FunctionalityControl.get, function(req, res, next) {
  let flashMsg = req.session.flashMsg
  if(flashMsg) delete req.session.flashMsg
  res.render('configuration/profile/list', {
    sess: req.session,
    redirectUrl: req.originalUrl,
    profiles: req.profiles,
    functionalities: req.functionalities,
    flashMsg
  })
})

router.get('/:id', ProfileSystemAccessControl.getByIDWithFunctionalities, function(req, res, next) {
  Functionality.findAll({where: {System_ID: 4}, order: sequelize.col('Priority')})
  .then(function(functionalities) {
    res.json({profile: req.profile, functionalities})
  }).catch(function(err) {
    next(err)
  })
})

router.post('/update', ProfileSystemAccessControl.update,
FunctionalityControl.reloadMenu, function(req, res, next) {
  req.session.flashMsg = {
    txtMsg: __('messages.sucessAlter'),
    styleMsg: 'alert-success'
  }
  res.redirect('/configuration/profile')
})

module.exports = router
