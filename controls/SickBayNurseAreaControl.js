const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SickBayNurseArea = require(process.env.PWD + '/models/SickBayNurseArea')

function SickBayNurseAreaControl() {
  this.save = (req, res, next) => {
    SickBayNurseArea.findOne({
      where: {MatriculaNurse: req.body.matriculaNurse}
    }).then(result => {
      if(result) {
        SickBayNurseArea.update(
          {SickBayArea_ID: req.body.sickBayArea},
          {where: {MatriculaNurse: req.body.matriculaNurse}}
        ).then(() => { next() })
        .catch(err => { next(err) })
      } else {
        SickBayNurseArea.create({
          MatriculaNurse: req.body.matriculaNurse,
          SickBayArea_ID: req.body.sickBayArea
        }).then(() => { next() })
        .catch(err => { next(err) })
      }
    })
  }
}

module.exports = new SickBayNurseAreaControl()
