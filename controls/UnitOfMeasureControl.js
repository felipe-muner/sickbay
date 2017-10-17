const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const UnitOfMeasure = require(process.env.PWD + '/models/UnitOfMeasure')

function UnitOfMeasureControl() {
  this.get = function(req, res, next) {
    UnitOfMeasure.findAll({
      where: { SickBay: true },
      order: [['Name', 'ASC']]
    }).then(unit => {
      req.UnitOfMeasure = unit
      next()
    }).catch(err => {
      next(err)
    })
  }
}

module.exports = new UnitOfMeasureControl()
