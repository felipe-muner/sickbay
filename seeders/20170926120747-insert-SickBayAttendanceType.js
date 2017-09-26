'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SickBayAttendanceType', [
      {Name: 'internalIncident'},
      {Name: 'externalIncident'},
      {Name: 'accident'},
      {Name: 'visit'}
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('SickBayAttendanceType', null, {})
  }
}
