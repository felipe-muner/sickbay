const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SickBayPatientType = sequelize.define('SickBayPatientType', {
  SickBayPatientTypeID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  Name: Sequelize.STRING
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = SickBayPatientType
