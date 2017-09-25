const express = require('express')
const moment = require('moment')
const md5 = require('md5')
const i18n = require('i18n')
const fs = require('fs')

const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const auth = require(process.env.PWD + '/controls/AutorizationControl')
const Util = require(process.env.PWD + '/util/Util')
const MailSender = require(process.env.PWD + '/util/MailSender')
const User = require(process.env.PWD + '/models/User')
const Functionality = require(process.env.PWD + '/models/Functionality')
const ProfileFunctionality = require(process.env.PWD + '/models/ProfileFunctionality')
const SickBayArea = require(process.env.PWD + '/models/SickBayArea')
const SickBayNurseArea = require(process.env.PWD + '/models/SickBayNurseArea')

const router = express.Router()

router.get('/en', function(req, res, next) {
  i18n.setLocale('en')
  res.redirect(req.query.redirectUrl)
})

router.get('/pt-BR', function(req, res, next) {
  i18n.setLocale('pt-BR')
  res.redirect(req.query.redirectUrl)
})

router.get('/', function(req, res, next) {
  if(req.session.enrollment) {
    res.redirect('/home')
  } else {
    let flashMsg = req.session.flashMsg
    if(flashMsg) delete req.session.flashMsg
    res.render('login', {layout: false, redirectUrl: req.originalUrl , flashMsg})
  }
})

router.post('/login', function(req, res, next) {
  sequelize.query('SELECT u.matricula, u.nomeusuario, u.AttemptLogin, u.senha, u.date_last_change_pass, ' +
                     'u.primeiroacesso, s.idsistema, uca.id_perfil_sistema, pas.nomeperfilacesso, pas.all_units, ' +
                     'unidades.idunidade, unidades.unidade, departamentos.nomedepartamento, ' +
                     '(SELECT valor FROM constantes WHERE nome = $constante) AS limitDaySamePassword ' +
                'FROM sistemas s ' +
                  'INNER JOIN usuarios u ' +
                  'INNER JOIN usuario_controle_acesso uca ON s.idsistema = uca.id_sistema AND uca.id_usuario = u.idusuario AND usuario_acessa = 1 ' +
                  'INNER JOIN perfis_acesso_sistemas pas ON uca.id_perfil_sistema = pas.idperfilsistema ' +
                  'INNER JOIN unidades ON u.id_site = unidades.idunidade ' +
                  'INNER JOIN departamentos ON u.id_departamento = departamentos.iddepartamento ' +
                'WHERE s.idsistema = 4 AND matricula = $matricula', {
    bind: {constante: 'qtd_dia_alter_senha', matricula: parseInt(req.body.enrollment)},
    type: sequelize.QueryTypes.SELECT
  }).then(function(user) {
    if(user.length === 0) {
      req.session.flashMsg = {strongMsg: '', txtMsg: __('messages.incorrectEnrollment'), styleMsg: 'alert-danger'}
      res.redirect('/')
    } else if(user[0].senha !== md5(req.body.password)) {
      User.update({AttemptLogin: user[0].AttemptLogin + 1}, {where: {matricula: parseInt(req.body.enrollment)}})
      .then(function() {
        req.session.flashMsg = {strongMsg: '', txtMsg: __('messages.incorrectPassword'), styleMsg: 'alert-danger'}
        res.redirect('/')
      })
      .catch(function(err) { next(err) })
    } else {
      if(user[0].AttemptLogin > 2) {
        req.session.flashMsg = {strongMsg: '', txtMsg: __('messages.blockedUser'), styleMsg: 'alert-danger'}
        res.redirect('/')
      } else if(user[0].primeiroacesso === 0) {
        req.session.flashMsg = {strongMsg: '', txtMsg: __('messages.firstAccess'), styleMsg: 'alert-info'}
        res.redirect('/change-password' + '?m=' + req.body.enrollment + '&p=' + md5(req.body.password))
      } else if(moment().diff(moment(user[0].date_last_change_pass), 'days') > parseInt(user[0].limitDaySamePassword)) {
        req.session.flashMsg = {strongMsg: '', txtMsg: __('messages.limitDaySamePassword'), styleMsg: 'alert-info'}
        res.redirect('/change-password' + '?m=' + req.body.enrollment + '&p=' + md5(req.body.password))
      } else {
        User.update({AttemptLogin: 0}, {where: {matricula: parseInt(req.body.enrollment)}})
        .catch(function(err) { next(err) })

        Functionality.findAll({
          include: [
            {model: Functionality, include:[
              {model: ProfileFunctionality, where: {Profile_ID: user[0].id_perfil_sistema}}
            ]},
            {model: ProfileFunctionality, where: {Profile_ID: user[0].id_perfil_sistema}}
          ],
          where: {FunctionalityFather_ID: null, System_ID: 4},
          order: sequelize.col('Priority')
        })
        .then(function(functionalities) {
          req.session.enrollment = user[0].matricula
          req.session.nameUser = user[0].nomeusuario
          req.session.unit = user[0].unidade
          req.session.unitID = user[0].idunidade
          req.session.allUnits = user[0].all_units
          req.session.profile = user[0].nomeperfilacesso
          req.session.department = user[0].nomedepartamento
          req.session.profileID = user[0].id_perfil_sistema
          req.session.functionalityProfile = functionalities.map(f => {
            f.dataValues.Functionalities.length > 0 ? f.dataValues.hasFunctionalities = true : f.dataValues.hasFunctionalities = false;
            f.dataValues.Functionalities.sort(Util.orderFunctionality);
            return f
          })

          if(user[0].nomeperfilacesso === 'Administrador') {
            req.session.isNurse = false
            req.session.sickBayAreaID = null
            req.session.sickBayAreaName = null
            res.redirect('/')
          } else {
            req.session.isNurse = true
            SickBayNurseArea.findOne({
              include: {model: SickBayArea, required: false},
              where: {MatriculaNurse: user[0].matricula}
            }).then(result => {
              if(result) {
                req.session.sickBayAreaID = result.SickBayAreaID
                req.session.sickBayAreaName = result.SickBayArea.Name
              } else {
                req.session.sickBayAreaID = null
                req.session.sickBayAreaName = null
              }
              res.redirect('/')
            }).catch(function(err) { next(err) })
          }

        }).catch(function(err) { next(err) })
      }
    }
  }).catch(function(err) { next(err) })
})

router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.render('login', {layout: false, alertClass: 'alert-success', msg: __('messages.logoutUser'), redirectUrl: req.originalUrl})
})

router.post('/email-forget-password', function(req, res, next) {
  let randomPassword = md5(Util.randomAlphaNumeric(6))
  let enrollment = parseInt(req.body.enrollmentToReset)
  User.update({senha: randomPassword, primeiroacesso: 0}, {where: {matricula: enrollment}})
  .then(function(affectedRows) {
    if(affectedRows[0] > 0) {
      User.findOne({where: {matricula: enrollment}})
      .then(function(user) {
        MailSender.emailRecoverPassword(randomPassword, user.dataValues.email, enrollment)
        req.session.flashMsg = {strongMsg: '', txtMsg: __('messages.sendEmail'), styleMsg: 'alert-info'}
        res.redirect('/')
      })
    } else {
      req.session.flashMsg = {strongMsg: '', txtMsg: __('messages.incorrectEnrollment'), styleMsg: 'alert-danger'}
      res.redirect('/')
    }
  }).catch(function(err) { next(err) })
})

router.get('/change-password', function(req, res, next) {
  let obj = {layout: false}
  if (req.session.enrollment) {
    res.render('change-password-session', {sess: req.session, redirectUrl: req.originalUrl})
  } else {
    obj.redirectUrl = req.originalUrl
    obj.enrollment = req.query.m
    obj.password = req.query.p
    let msg = req.session.msg
    let alertClass = req.session.alertClass
    if(msg) {
      delete req.session.msg
      delete req.session.alertClass
      obj.msg = msg
      obj.alertClass = alertClass
    }
    res.render('change-password', obj)
  }
})

router.post('/change-password', function(req, res, next) {
  let enrollment = parseInt(req.body.enrollment)
  let currentPassword = req.session.enrollment ? md5(req.body.currentPassword) : req.body.currentPassword
  let checkPassword = Util.checkPassword(req.body.newPassword, req.body.confirmPassword)
  if(checkPassword.validate) {
    User.findOne({where: {matricula: enrollment, senha: currentPassword}})
    .then(function(user) {
      if(!user) {
        if (req.session.enrollment) {
          res.render('change-password-session', {sess: req.session, msg: __('messages.incorrectPassword'), alertClass: 'alert-danger', redirectUrl: req.originalUrl})
        } else {
          req.session.msg = __('messages.incorrectPassword')
          req.session.alertClass = 'alert-danger'
          res.redirect('/change-password' + '?m=' + enrollment + '&p=' + md5(currentPassword))
        }
      } else {
        User.update(
          {senha: md5(req.body.newPassword), primeiroacesso: 1, AttemptLogin: 0, date_last_change_pass: moment().format('YYYY-MM-DD HH:mm:ss')},
          {where: {matricula: enrollment}}
        ).then(function() {
          req.session.flashMsg = {strongMsg: __('password'), txtMsg: __('messages.sucessAlter'), styleMsg: 'alert-success'}
          res.redirect('/')
        }).catch(function(err) { next(err) })
      }
    }).catch(function(err) { next(err) })
  } else {
    if (req.session.enrollment) {
      res.render('change-password-session', {sess: req.session, msg: checkPassword.msg, alertClass: checkPassword.alertClass, redirectUrl: req.originalUrl})
    } else {
      req.session.msg = checkPassword.msg
      req.session.alertClass = checkPassword.alertClass
      res.redirect('/change-password' + '?m=' + enrollment + '&p=' + currentPassword)
    }
  }
})

router.all('*', function(req, res, next) {
  req.session.enrollment ? next() : res.redirect('/')
})

router.get('/translate-data-table', function(req, res, next) {
  let json = require(process.env.PWD + '/locales/data-tables/' + i18n.getLocale())
  res.json(json)
})

router.get('/translate-validations', function(req, res, next) {
  let json = require(process.env.PWD + '/locales/validations/' + i18n.getLocale())
  res.json(json)
})

router.get('/home', function(req, res, next) {
  console.log('Usuario: ' + req.session.enrollment + ' - ' + req.session.nameUser)
  console.log('Perfil: ' + req.session.profile)
  console.log('Unidade: ' + req.session.unit)

  let flashMsg = req.session.flashMsg
  if(flashMsg) delete req.session.flashMsg
  res.render('index', {sess: req.session, redirectUrl: req.originalUrl, flashMsg})
})

router.all('*', auth.verify, function(req, res, next) {
  req.urlRoute.length > 0 ? next() : res.render('error', {
    message: __('unauthorized'),
    error: {stack: __('messages.unauthorized')},
    redirectUrl: req.originalUrl
  })
})

module.exports = router
