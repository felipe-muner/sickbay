'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('SickBayMedicationControlled', 'CloseReason', {
      type: Sequelize.TEXT,
      allowNull: true
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('SickBayMedicationControlled', 'CloseReason')
  }
}
