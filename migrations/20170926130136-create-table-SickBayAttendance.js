'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('SickBayAttendance', {
      SickBayAttendanceID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Schedule: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Nurse_Matricula: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'usuarios',
          key: 'matricula'
        }
      },
      SickBayArea_ID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'SickBayArea',
          key: 'SickBayAreaID'
        }
      },
      SickBayAttendanceType_ID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'SickBayAttendanceType',
          key: 'SickBayAttendanceTypeID'
        }
      },
      PatientType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Patient_Matricula: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      PatientName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Allergy: {
        allowNull: true,
        type: Sequelize.STRING
      },
      YearGroup: {
        allowNull: true,
        type: Sequelize.STRING
      },
      Class: {
        allowNull: true,
        type: Sequelize.STRING
      },
      UnitSchool: {
        allowNull: true,
        type: Sequelize.STRING
      },
      Reason: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      Procedure: {
        allowNull: false,
        type: Sequelize.TEXT
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('SickBayAttendance')
  }
}
