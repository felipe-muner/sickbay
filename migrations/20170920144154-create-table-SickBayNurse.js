'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('SickBayNurse', {
      SickBayNurseID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MatriculaNurse: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'matricula'
        }
      },
      SickBayID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'SickBay',
          key: 'SickBayID'
        }
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('SickBayNurse')
  }
}
