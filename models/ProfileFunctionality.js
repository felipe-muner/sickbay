const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const ProfileFunctionality = sequelize.define('ProfileFunctionality', {
  ProfileFunctionalityID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  Profile_ID: Sequelize.INTEGER,
  Functionality_ID: Sequelize.INTEGER
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = ProfileFunctionality
