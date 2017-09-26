'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('SickBayMedicationSchedule', {
      SickBayMedicationScheduleID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SickBayMedicationControlled_ID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'SickBayMedicationControlled',
          key: 'SickBayMedicationControlledID'
        }
      },
      CheckSchedule1: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      MatriculaNurseCheckSchedule1: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'matricula'
        }
      },
      CheckSchedule2: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      MatriculaNurseCheckSchedule2: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'matricula'
        }
      },
      CheckSchedule3: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      MatriculaNurseCheckSchedule3: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'matricula'
        }
      },
      CheckSchedule4: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      MatriculaNurseCheckSchedule4: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'matricula'
        }
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('SickBayMedicationSchedule')
  }
}
