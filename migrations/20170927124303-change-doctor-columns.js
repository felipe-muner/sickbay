'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('SickBayMedicationControlled',
        'DoctorName', {
          allowNull: true,
          type: Sequelize.STRING
        }
      ),

      queryInterface.changeColumn('SickBayMedicationControlled',
        'DoctorContact', {
          allowNull: true,
          type: Sequelize.STRING
        }
      )
    ])
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('SickBayMedicationControlled',
        'DoctorName', {
          allowNull: false,
          type: Sequelize.STRING
        }
      ),

      queryInterface.changeColumn('SickBayMedicationControlled',
        'DoctorContact', {
          allowNull: false,
          type: Sequelize.STRING
        }
      )
    ])
  }
}
