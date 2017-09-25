const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const Util = require(process.env.PWD + '/util/Util')
const ProfileSystemAccess = require(process.env.PWD + '/models/ProfileSystemAccess')
const Functionality = require(process.env.PWD + '/models/Functionality')
const ProfileFunctionality = require(process.env.PWD + '/models/ProfileFunctionality')

function ProfileSystemAccessControl() {

  this.get = function(req, res, next) {
    ProfileSystemAccess.findAll({where: {id_sistema: 4}}).then(profiles => {
      req.profiles = profiles
      next()
    }).catch(err => {
      next(err)
    })
  },

  this.create = function(req, res, next) {
    ProfileSystemAccess.create({
      nomeperfilacesso: req.body.nameProfile,
      id_sistema: 4,
      all_units: req.body.allUnits
    }).then(function(profile) {
      ProfileSystemAccess.findOne({where: {nomeperfilacesso: req.body.nameProfile, id_sistema: 4}}).then(function(p) {
        if(req.body.functionalityID) {
          if(typeof req.body.functionalityID === "object") {
            let bulkQuery = []
            req.body.functionalityID.map(function(functionalityID){
              bulkQuery.push({Profile_ID: p.dataValues.idperfilsistema, Functionality_ID: functionalityID})
            })
            ProfileFunctionality.bulkCreate(bulkQuery).then(function() {
              next()
            })
          } else {
            ProfileFunctionality.create({
              Profile_ID: p.dataValues.idperfilsistema, Functionality_ID: req.body.functionalityID
            }).then(function() {
              next()
            })
          }
        } else {
          next()
        }
      }).catch(function(err) {
        next(err)
      })
    }).catch(function(err) {
      next(err)
    })
  },

  this.getByIDWithFunctionalities = function(req, res, next) {
    ProfileSystemAccess.findOne({
      attributes: {include: [[sequelize.fn('GROUP_CONCAT', sequelize.col('Functionality_ID')), 'Functionalities']]},
      include: [{model: ProfileFunctionality, required: false, attributes: []}],
      where: {idperfilsistema: req.params.id},
      group: ['idperfilsistema']
    }).then(profile => {
      req.profile = profile
      next()
    }).catch(err => {
      next(err)
    })
  }

  this.update = function(req, res, next) {
    ProfileFunctionality.destroy({where: {Profile_ID: req.body.idProfile}})
    .then(function() {
      ProfileSystemAccess.update({
        nomeperfilacesso: req.body.nameProfile,
        all_units: req.body.allUnits
      },
      {where: {idperfilsistema: req.body.idProfile}})
      .then(function(profile) {
        if(req.body.functionalityID) {
          if(typeof req.body.functionalityID === "object") {
            let bulkQuery = []
            req.body.functionalityID.map(function(functionalityID){
              bulkQuery.push({Profile_ID: req.body.idProfile, Functionality_ID: functionalityID})
            })
            ProfileFunctionality.bulkCreate(bulkQuery).then(function() {
              next()
            })
          } else {
            ProfileFunctionality.create({
              Profile_ID: req.body.idProfile, Functionality_ID: req.body.functionalityID
            }).then(function() {
              next()
            })
          }
        } else {
          next()
        }
      }).catch(function(err) {
        next(err)
      })
    }).catch(function(err) {
      next(err)
    })
  }

}

module.exports = new ProfileSystemAccessControl()
