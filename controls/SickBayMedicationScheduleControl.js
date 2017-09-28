const moment = require('moment')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')
const SickBayMedicationSchedule = require(process.env.PWD + '/models/SickBayMedicationSchedule')

function SickBayMedicationScheduleControl() {
  this.update = function(req, res, next) {
    let updateOptions = {}
    switch(req.body.Hr) {
      case 'Hr1':
        updateOptions.Ch1 = true
        updateOptions.ChdHr1 = moment().format('HH:mm:ss')
        updateOptions.Matricula1 = req.session.enrollment
        break;
      case 'Hr2':
        updateOptions.Ch2 = true
        updateOptions.ChdHr2 = moment().format('HH:mm:ss')
        updateOptions.Matricula2 = req.session.enrollment
        break;
      case 'Hr3':
        updateOptions.Ch3 = true
        updateOptions.ChdHr3 = moment().format('HH:mm:ss')
        updateOptions.Matricula3 = req.session.enrollment
        break;
      case 'Hr4':
        updateOptions.Ch4 = true
        updateOptions.ChdHr4 = moment().format('HH:mm:ss')
        updateOptions.Matricula4 = req.session.enrollment
        break;
    }

    SickBayMedicationSchedule.update(updateOptions, {
      where: {SickBayMedicationScheduleID : req.body.SickBayMedicationScheduleID}
    }).then(() => {
      next()
    }).catch(err => { next(err) })
  }
}

module.exports = new SickBayMedicationScheduleControl()
