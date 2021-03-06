const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SickBayAttendanceType = sequelize.define('SickBayAttendanceType', {
  SickBayAttendanceTypeID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  Name: Sequelize.STRING
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = SickBayAttendanceType
