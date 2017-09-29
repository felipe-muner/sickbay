const moment = require('moment')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SickBayReturnAttendance = require(process.env.PWD + '/models/SickBayReturnAttendance')
const User = require(process.env.PWD + '/models/User')

toTitleCase = function(str) {
  str = str || ''
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})
}

function SickBayReturnAttendanceControl() {
  this.new = function(req, res, next) {
    req.body.Nurse_Matricula = req.session.enrollment
    req.body.ReturnReason = req.body.ReturnReason.trim() !== '' ? req.body.ReturnReason : null
    SickBayReturnAttendance.create(req.body).then(returnAttendance => {
      SickBayReturnAttendance.findOne({
        include: { model: User },
        where: { SickBayReturnAttendanceID: returnAttendance.SickBayReturnAttendanceID }
      }).then(result => {
        req.returnAttendance = {
          Schedule: moment(result.Schedule).format('DD/MM/YYYY HH:mm'),
          ReturnReason: result.ReturnReason,
          Nurse: toTitleCase(result.usuario.nomeusuario)
        }
        next()
      }).catch(err => { next(err) })
    }).catch(err => { next(err) })
  }
}

module.exports = new SickBayReturnAttendanceControl()
