const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SickBayAttendance = sequelize.define('SickBayAttendance', {
  SickBayAttendanceID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  Schedule: Sequelize.DATE,
  MatriculaNurse: {
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
  SickBayPatientType_ID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'SickBayPatientType',
      key: 'SickBayPatientTypeID'
    }
  },
  MatriculaPatient: Sequelize.INTEGER,
  PatientName: Sequelize.STRING,
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
