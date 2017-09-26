const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SickBayRemedy = sequelize.define('SickBayRemedy', {
  SickBayRemedyID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  Name: Sequelize.STRING
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = SickBayRemedy
