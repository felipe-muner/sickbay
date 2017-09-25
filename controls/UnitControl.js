const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const Unit = require(process.env.PWD + '/models/Unit')

function UnitControl() {
  this.get = function(req, res, next) {
    Unit.findAll().then(units => {
      req.units = units
      next()
    }).catch(err => {
      next(err)
    })
  }
}

module.exports = new UnitControl()
