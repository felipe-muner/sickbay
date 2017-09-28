'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('SickBayMedicationControlled', 'SickBayArea_ID', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'SickBayArea',
        key: 'SickBayAreaID'
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('SickBayMedicationControlled', 'SickBayArea_ID')
  }
}
