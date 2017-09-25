const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const Unit = sequelize.define('unidades', {
  idunidade: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  unidade: Sequelize.STRING,
  exibe_cadastro_controle_user: Sequelize.INTEGER
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = Unit
