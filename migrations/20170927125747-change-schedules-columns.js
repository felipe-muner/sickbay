'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('SickBayMedicationSchedule',
        'Hr2', {
          allowNull: true,
          type: Sequelize.TIME
        }
      ),

      queryInterface.changeColumn('SickBayMedicationSchedule',
        'Hr3', {
          allowNull: true,
          type: Sequelize.TIME
        }
      ),

      queryInterface.changeColumn('SickBayMedicationSchedule',
        'Hr4', {
          allowNull: true,
          type: Sequelize.TIME
        }
      )
    ])
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('SickBayMedicationSchedule',
        'Hr2', {
          allowNull: false,
          type: Sequelize.TIME
        }
      ),

      queryInterface.changeColumn('SickBayMedicationSchedule',
        'Hr3', {
          allowNull: false,
          type: Sequelize.TIME
        }
      ),

      queryInterface.changeColumn('SickBayMedicationSchedule',
        'Hr4', {
          allowNull: false,
          type: Sequelize.TIME
        }
      )
    ])
  }
}
