const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SickBayArea = require(process.env.PWD + '/models/SickBayArea')
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
        ).then(() => {
          if(parseInt(req.body.matriculaNurse) === req.session.enrollment) {
            SickBayArea.findOne({
              where: { SickBayAreaID: req.body.sickBayArea }
            }).then(area => {
              req.session.sickBayAreaID = area.SickBayAreaID
              req.session.sickBayAreaName = area.Name
              next()
            }).catch(err => { next(err) })
          } else {
            next()
          }
        }).catch(err => { next(err) })
      } else {
        SickBayNurseArea.create({
          MatriculaNurse: req.body.matriculaNurse,
          SickBayArea_ID: req.body.sickBayArea
        }).then(() => {
          if(parseInt(req.body.matriculaNurse) === req.session.enrollment) {
            SickBayArea.findOne({
              where: { SickBayAreaID: req.body.sickBayArea }
            }).then(area => {
              req.session.sickBayAreaID = area.SickBayAreaID
              req.session.sickBayAreaName = area.Name
              next()
            }).catch(err => { next(err) })
          } else {
            next()
          }
        }).catch(err => { next(err) })
      }
    })
  }
}

module.exports = new SickBayNurseAreaControl()
