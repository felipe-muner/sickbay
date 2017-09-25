'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.dropTable('SickBayNurse'),

      queryInterface.dropTable('SickBay')
    ])
  }
}
