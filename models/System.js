const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const System = sequelize.define('sistemas', {
  idsistema: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  nomesistema: Sequelize.STRING
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = System
