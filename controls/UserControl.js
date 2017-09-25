const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const User = require(process.env.PWD + '/models/User')
const SickBayArea = require(process.env.PWD + '/models/SickBayArea')
const SickBayNurseArea = require(process.env.PWD + '/models/SickBayNurseArea')

function UserControl() {
  this.getNurses = function(req, res, next) {
    User.findAll({
      include: {
        model: SickBayNurseArea,
        required: false,
        include: {
          model: SickBayArea,
          required: false
        }
      },
      where: {
        id_departamento: 6,
        ativo: 1
      }
    }).then(nurses => {
      req.nurses = nurses
      next()
    })
    .catch(err => { next(err) })
  }

  this.getEmployer = function(req, res, next) {
    User.findAll().then(Employer => {
      req.Employer = Employer
      next()
    }).catch(err => {
      next(err)
    })
  }
}

module.exports = new UserControl()
