const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SickBayMedicationType = sequelize.define('SickBayMedicationType', {
  SickBayMedicationTypeID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  Name: Sequelize.STRING
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = SickBayMedicationType
