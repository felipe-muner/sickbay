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
      Nurse_Matricula: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'matricula'
        }
      },
      Student_Matricula: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      Start: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      End: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      Hr1: {
        allowNull: false,
        type: Sequelize.TIME
      },
      Hr2: {
        allowNull: true,
        type: Sequelize.TIME
      },
      Hr3: {
        allowNull: true,
        type: Sequelize.TIME
      },
      Hr4: {
        allowNull: true,
        type: Sequelize.TIME
      },
      Type: {
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
