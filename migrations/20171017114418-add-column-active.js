'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('SickBayMedicationControlled', 'Active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('SickBayMedicationControlled', 'Active')
  }
}
