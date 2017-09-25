const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const Functionality = sequelize.define('Functionality', {
  FunctionalityID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  Name: Sequelize.STRING,
  Action: Sequelize.STRING,
  Icon: Sequelize.STRING,
  System_ID: Sequelize.INTEGER,
  FunctionalityFather_ID: Sequelize.INTEGER,
  Active: Sequelize.INTEGER,
  Priority: Sequelize.INTEGER
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = Functionality
