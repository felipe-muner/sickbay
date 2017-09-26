const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SickBayAttendance = sequelize.define('SickBayAttendance', {
  SickBayMedicationControlledID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  MatriculaStudent: Sequelize.INTEGER,
  StartMedication: Sequelize.DATEONLY,
  EndMedication: Sequelize.DATEONLY,
  Schedule1: Sequelize.STRING,
  Schedule2: Sequelize.STRING,
  Schedule3: Sequelize.STRING,
  Schedule4: Sequelize.STRING,
  SickBayMedicationType_ID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'SickBayMedicationType',
      key: 'SickBayMedicationTypeID'
    }
  },
  Medication: Sequelize.STRING,
  Note: Sequelize.TEXT,
  Responsible: Sequelize.STRING,
  DoctorName: Sequelize.STRING,
  DoctorContact: Sequelize.STRING
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = SickBayAttendance
