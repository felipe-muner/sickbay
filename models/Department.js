const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const Department = sequelize.define('departamentos', {
  iddepartamento: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  nomedepartamento: Sequelize.STRING
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = Department
