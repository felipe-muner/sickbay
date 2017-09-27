'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('SickBayAttendanceMedication', {
      SickBayAttendanceMedicationID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SickBayAttendance_ID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'SickBayAttendance',
          key: 'SickBayAttendanceID'
        }
      },
      SickBayRemedy_ID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'SickBayRemedy',
          key: 'SickBayRemedyID'
        }
      },
      Amount: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      UnitOfMeasure_ID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'UnitOfMeasure',
          key: 'UnitOfMeasureID'
        }
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('SickBayAttendanceMedication')
  }
}
