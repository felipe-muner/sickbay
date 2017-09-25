const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const ProfileSystemAccess = sequelize.define('perfis_acesso_sistemas', {
  idperfilsistema: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  nomeperfilacesso: Sequelize.STRING,
  id_sistema: Sequelize.INTEGER,
  all_units: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = ProfileSystemAccess
