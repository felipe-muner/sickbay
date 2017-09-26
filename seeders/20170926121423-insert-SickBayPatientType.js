'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SickBayPatientType', [
      {Name: 'student'},
      {Name: 'employee'},
      {Name: 'other'}
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('SickBayPatientType', null, {})
  }
}
