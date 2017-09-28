const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SickBayReturnAttendance = sequelize.define('SickBayReturnAttendance', {
  SickBayReturnAttendanceID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  SickBayAttendance_ID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'SickBayAttendance',
      key: 'SickBayAttendanceID'
    }
  },
  Schedule: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  },
  Nurse_Matricula: {
    type: Sequelize.INTEGER,
    references: {
      model: 'usuarios',
      key: 'matricula'
    }
  },
  ReturnReason: Sequelize.TEXT
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = SickBayReturnAttendance
