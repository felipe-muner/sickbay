'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('UnitOfMeasure', {
      UnitOfMeasureID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      SickBay: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('UnitOfMeasure')
  }
}
