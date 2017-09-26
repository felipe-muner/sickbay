const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SickBayAttendanceMedication = sequelize.define('SickBayAttendanceMedication', {
  SickBayAttendanceMedicationID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  SickBayAttendance_ID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'SickBayAttendance',
      key: 'SickBayAttendanceID'
    }
  },
  SickBayRemedy_ID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'SickBayRemedy',
      key: 'SickBayRemedyID'
    }
  },
  Amount: Sequelize.STRING,
  UnitOfMeasure_ID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'UnitOfMeasure',
      key: 'UnitOfMeasureID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = SickBayAttendanceMedication
