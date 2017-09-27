const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SickBayMedicationSchedule = sequelize.define('SickBayMedicationSchedule', {
  SickBayMedicationScheduleID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  SickBayMedicationControlled_ID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'SickBayMedicationControlled',
      key: 'SickBayMedicationControlledID'
    }
  },
  MedicationDate: Sequelize.DATEONLY,
  Hr1: Sequelize.TIME,
  Ch1: Sequelize.BOOLEAN,
  ChdHr1: Sequelize.TIME,
  Matricula1: {
    type: Sequelize.INTEGER,
    references: {
      model: 'usuarios',
      key: 'matricula'
    }
  },
  Hr2: Sequelize.TIME,
  Ch2: Sequelize.BOOLEAN,
  ChdHr2: Sequelize.TIME,
  Matricula2: {
    type: Sequelize.INTEGER,
    references: {
      model: 'usuarios',
      key: 'matricula'
    }
  },
  Hr3: Sequelize.TIME,
  Ch3: Sequelize.BOOLEAN,
  ChdHr3: Sequelize.TIME,
  Matricula3: {
    type: Sequelize.INTEGER,
    references: {
      model: 'usuarios',
      key: 'matricula'
    }
  },
  Hr4: Sequelize.TIME,
  Ch4: Sequelize.BOOLEAN,
  ChdHr4: Sequelize.TIME,
  Matricula4: {
    type: Sequelize.INTEGER,
    references: {
      model: 'usuarios',
      key: 'matricula'
    }
  }
}, {
  timestamps: false,
  freezeTableName: true
})

module.exports = SickBayMedicationSchedule
