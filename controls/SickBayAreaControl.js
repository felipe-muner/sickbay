const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SickBayArea = require(process.env.PWD + '/models/SickBayArea')

function SickBayAreaControl() {
  this.get = function(req, res, next) {
    SickBayArea.findAll().then(sickBayAreas => {
      req.sickBayAreas = sickBayAreas
      next()
    }).catch(err => {
      next(err)
    })
  }
}

module.exports = new SickBayAreaControl()
