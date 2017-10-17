'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('SickBayMedicationControlled', 'ClosedAt', {
      type: Sequelize.DATE,
      allowNull: true
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('SickBayMedicationControlled', 'ClosedAt')
  }
}
