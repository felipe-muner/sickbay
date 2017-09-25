const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const UserControlAccess = sequelize.define('usuario_controle_acesso', {
  idcontrole: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  id_usuario: Sequelize.INTEGER,
  id_sistema: Sequelize.INTEGER,
  id_perfil_sistema: Sequelize.INTEGER,
  usuario_acessa: Sequelize.INTEGER
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = UserControlAccess
