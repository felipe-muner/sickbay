const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const User = require(process.env.PWD + '/models/User')
const SickBayArea = require(process.env.PWD + '/models/SickBayArea')
const SickBayNurseArea = require(process.env.PWD + '/models/SickBayNurseArea')
const UserControlAccess = require(process.env.PWD + '/models/UserControlAccess')

function UserControl() {
  this.getNurses = function(req, res, next) {
    User.findAll({
      include: [{
        model: UserControlAccess,
        required: true,
        where: {
          id_sistema: process.env.SYSTEM_ID,
          usuario_acessa: 1
        }
      }, {
        model: SickBayNurseArea,
        required: false,
        include: {
          model: SickBayArea,
          required: false
        }
      }],
      where: {
        ativo: 1
      }
    }).then(nurses => {
      req.nurses = nurses
      next()
    })
    .catch(err => { next(err) })
  }

  this.getEmployer = function(req, res, next) {
    User.findAll({
      order: [['nomeusuario', 'ASC']]
    }).then(Employer => {
      req.Employer = Employer
      next()
    }).catch(err => {
      next(err)
    })
  }
}

module.exports = new UserControl()
