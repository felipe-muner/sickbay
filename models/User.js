const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const User = sequelize.define('usuarios', {
  idusuario: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  dataregistro: Sequelize.DATE,
  nomeusuario: Sequelize.STRING,
  email: Sequelize.STRING,
  matricula: Sequelize.INTEGER,
  id_departamento: Sequelize.INTEGER,
  login: Sequelize.STRING,
  senha: Sequelize.STRING,
  primeiroacesso: Sequelize.INTEGER,
  date_last_change_pass: Sequelize.DATE,
  hora_entrada: Sequelize.TIME,
  hora_saida: Sequelize.TIME,
  id_site: Sequelize.INTEGER,
  ativo: Sequelize.INTEGER,
  data_demissao: Sequelize.DATE,
  tipo: {
    type: Sequelize.ENUM,
    values: ['A', 'E']
  },
  AttemptLogin: Sequelize.INTEGER,
  Purchasing_ID: Sequelize.INTEGER
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = User
