const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const Functionality = require(process.env.PWD + '/models/Functionality')
const ProfileFunctionality = require(process.env.PWD + '/models/ProfileFunctionality')

function AutorizationControl() {
  this.verify = function(req, res, next) {
    Functionality.findAll({where: {System_ID: 4}, order: sequelize.col('Priority')})
    .then(function(allFunctionalities) {
      Functionality.findAll({
        include: [{model: ProfileFunctionality, where: {Profile_ID: req.session.profileID}}],
        where: {System_ID: 4},
        order: sequelize.col('Priority')
      })
      .then(function(functionalities) {
        let functionality = allFunctionalities.filter(f => {
          return f.dataValues.Action === req.originalUrl
        })
        if(functionality.length > 0) {
          req.urlRoute = functionalities.filter(f => {
            return f.dataValues.Action === req.originalUrl
          })
        } else {
          req.urlRoute = ['']
        }
        next()
      }).catch(function(err) {
        next(err)
      })
    }).catch(function(err) {
      next(err)
    })
  }
}

module.exports = new AutorizationControl()
