const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SickBayAttendanceType = require(process.env.PWD + '/models/SickBayAttendanceType')

function UnitControl() {
  this.get = function(req, res, next) {
    SickBayAttendanceType.findAll().then(types => {
      req.AttendanceType = types
      next()
    }).catch(err => {
      next(err)
    })
  }
}

module.exports = new UnitControl()
