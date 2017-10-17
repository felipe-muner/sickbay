'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('SickBayMedicationControlled', 'ClosedNurse', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'usuarios',
        key: 'matricula'
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('SickBayMedicationControlled', 'ClosedNurse')
  }
}
