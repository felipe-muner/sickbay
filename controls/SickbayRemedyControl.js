const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SickBayRemedy = require(process.env.PWD + '/models/SickBayRemedy')

function SickBayRemedyControl() {
  this.get = function(req, res, next) {
    SickBayRemedy.findAll({
      order: [['Name', 'ASC']]
    }).then(Remedy => {
      req.Remedy = Remedy
      next()
    }).catch(err => {
      next(err)
    })
  }
}

module.exports = new SickBayRemedyControl()
