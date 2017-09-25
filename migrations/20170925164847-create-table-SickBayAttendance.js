'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('SickBayAttendance', {
      SickBayAttendanceID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('SickBayAttendance')
  }
}
