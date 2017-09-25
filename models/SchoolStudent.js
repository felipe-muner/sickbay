const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SchoolStudent = sequelize.define('SchoolStudent', {
  SchoolStudentID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  Matricula: Sequelize.INTEGER,
  Nome: Sequelize.STRING,
  Alergia: Sequelize.STRING,
  Turma: Sequelize.INTEGER,
  Serie: Sequelize.INTEGER,
  Filial: Sequelize.STRING,
  CodFilial: Sequelize.STRING
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = SchoolStudent
