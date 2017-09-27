const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SickBayAttendance = sequelize.define('SickBayAttendance', {
  SickBayAttendanceID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  Schedule: Sequelize.DATE,
  Nurse_Matricula: {
    type: Sequelize.INTEGER,
    references: {
      model: 'usuarios',
      key: 'matricula'
    }
  },
  SickBayArea_ID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'SickBayArea',
      key: 'SickBayAreaID'
    }
  },
  SickBayAttendanceType_ID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'SickBayAttendanceType',
      key: 'SickBayAttendanceTypeID'
    }
  },
  PatientType: Sequelize.STRING,
  Patient_Matricula: Sequelize.INTEGER,
  PatientName: Sequelize.STRING,
  Allergy: Sequelize.STRING,
  YearGroup: Sequelize.STRING,
  Class: Sequelize.STRING,
  UnitSchool: Sequelize.STRING,
  Reason: Sequelize.TEXT,
  Procedure: Sequelize.TEXT
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = SickBayAttendance
