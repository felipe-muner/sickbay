const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SickbayRemedy = require(process.env.PWD + '/models/SickbayRemedy')

function SickbayRemedyControl() {
  this.get = function(req, res, next) {
    SickbayRemedy.findAll().then(Remedy => {
      req.Remedy = Remedy
      next()
    }).catch(err => {
      next(err)
    })
  }
}

module.exports = new SickbayRemedyControl()
