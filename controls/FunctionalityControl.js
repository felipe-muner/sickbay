const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const Util = require(process.env.PWD + '/util/Util')
const Functionality = require(process.env.PWD + '/models/Functionality')
const ProfileFunctionality = require(process.env.PWD + '/models/ProfileFunctionality')

function FunctionalityControl() {

  this.get = function(req, res, next) {
    Functionality.findAll({
      include: [{model: Functionality}],
      where: {FunctionalityFather_ID: null, System_ID: 4},
      order: sequelize.col('Priority')
    })
    .then(function(functionalities) {
      req.functionalities = functionalities.map(f => {
        f.dataValues.Functionalities.length > 0 ? f.dataValues.hasFunctionalities = true : f.dataValues.hasFunctionalities = false;
        f.dataValues.Functionalities.sort(Util.orderFunctionality);
        return f
      })
      next()
    }).catch(function(err) {
      next(err)
    })
  },

  this.reloadMenu = function(req, res, next) {
    Functionality.findAll({
      include: [
        {model: Functionality, include:[
          {model: ProfileFunctionality, where: {Profile_ID: req.session.profileID}}
        ]},
        {model: ProfileFunctionality, where: {Profile_ID: req.session.profileID}}
      ],
      where: {FunctionalityFather_ID: null, System_ID: 4},
      order: sequelize.col('Priority')
    })
    .then(function(functionalities) {
      req.session.functionalityProfile = functionalities.map(f => {
        f.dataValues.Functionalities.length > 0 ? f.dataValues.hasFunctionalities = true : f.dataValues.hasFunctionalities = false;
        f.dataValues.Functionalities.sort(Util.orderFunctionality);
        return f
      })
      next()
    }).catch(function(err) {
      next(err)
    })
  }

}

module.exports = new FunctionalityControl()
