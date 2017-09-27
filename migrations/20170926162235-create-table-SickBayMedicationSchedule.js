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
      MedicationDate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      Hr1: {
        allowNull: false,
        type: Sequelize.TIME
      },
      Ch1: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      ChdHr1: {
        allowNull: true,
        type: Sequelize.TIME
      },
      Matricula1: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'matricula'
        }
      },
      Hr2: {
        allowNull: false,
        type: Sequelize.TIME
      },
      Ch2: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      ChdHr2: {
        allowNull: true,
        type: Sequelize.TIME
      },
      Matricula2: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'matricula'
        }
      },
      Hr3: {
        allowNull: false,
        type: Sequelize.TIME
      },
      Ch3: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      ChdHr3: {
        allowNull: true,
        type: Sequelize.TIME
      },
      Matricula3: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'matricula'
        }
      },
      Hr4: {
        allowNull: false,
        type: Sequelize.TIME
      },
      Ch4: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      ChdHr4: {
        allowNull: true,
        type: Sequelize.TIME
      },
      Matricula4: {
        allowNull: true,
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
