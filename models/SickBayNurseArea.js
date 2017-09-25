const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SickBayNurseArea = sequelize.define('SickBayNurseArea', {
  SickBayNurseAreaID: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  MatriculaNurse: {
    allowNull: false,
    unique: true,
    type: Sequelize.INTEGER,
    references: {
      model: 'usuarios',
      key: 'matricula'
    }
  },
  SickBayAreaID: {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: {
      model: 'SickBay',
      key: 'SickBayID'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = SickBayNurseArea
