'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('SickBayMedicationControlled', {
      SickBayMedicationControlledID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MatriculaStudent: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      StartMedication: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      EndMedication: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      Schedule1: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Schedule2: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Schedule3: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Schedule4: {
        allowNull: false,
        type: Sequelize.STRING
      },
      SickBayMedicationType_ID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'SickBayMedicationType',
          key: 'SickBayMedicationTypeID'
        }
      },
      Medication: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Note: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      Responsible: {
        allowNull: false,
        type: Sequelize.STRING
      },
      DoctorName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      DoctorContact: {
        allowNull: false,
        type: Sequelize.STRING
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('SickBayMedicationControlled')
  }
}
