'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('SickBayNurseArea', {
      SickBayNurseAreaID: {
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
      SickBayAreaID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'SickBayArea',
          key: 'SickBayAreaID'
        }
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('SickBayNurseArea')
  }
}
