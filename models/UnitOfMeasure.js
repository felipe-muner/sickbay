const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const UnitOfMeasure = sequelize.define('UnitOfMeasure', {
  UnitOfMeasureID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  Name: Sequelize.STRING,
  SickBay: Sequelize.BOOLEAN
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = UnitOfMeasure
