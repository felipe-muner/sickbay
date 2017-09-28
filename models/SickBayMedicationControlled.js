const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SickBayMedicationControlled = sequelize.define('SickBayMedicationControlled', {
  SickBayMedicationControlledID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nurse_Matricula: {
    type: Sequelize.INTEGER,
    references: {
      model: 'usuarios',
      key: 'matricula'
    }
  },
  Student_Matricula: Sequelize.INTEGER,
  Start: Sequelize.DATEONLY,
  End: Sequelize.DATEONLY,
  Hr1: Sequelize.TIME,
  Hr2: Sequelize.TIME,
  Hr3: Sequelize.TIME,
  Hr4: Sequelize.TIME,
  Type: Sequelize.STRING,
  Note: Sequelize.TEXT,
  Responsible: Sequelize.STRING,
  DoctorName: Sequelize.STRING,
  DoctorContact: Sequelize.STRING,
  SickBayArea_ID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'SickBayArea',
      key: 'SickBayAreaID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = SickBayMedicationControlled
