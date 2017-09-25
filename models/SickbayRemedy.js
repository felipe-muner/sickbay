const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SickbayRemedy = sequelize.define('SickbayRemedy', {
  idmedicamento: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  nomemedicamento: Sequelize.String
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = Remedy
