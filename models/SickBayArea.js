const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SickBayArea = sequelize.define('SickBayArea', {
  SickBayAreaID: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  Name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  UnitID: {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: {
      model: 'unidades',
      key: 'idunidade'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = SickBayArea
