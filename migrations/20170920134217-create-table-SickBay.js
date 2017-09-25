'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('SickBay', {
      SickBayID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      UnitID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'unidades',
          key: 'idunidade'
        }
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('SickBay')
  }
}
