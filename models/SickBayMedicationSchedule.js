const Sequelize = require('sequelize')
const sequelize = require(process.env.PWD + '/config/sequelize-connection')

const SickBayMedicationSchedule = sequelize.define('SickBayMedicationSchedule', {
  SickBayMedicationScheduleID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  SickBayMedicationControlled_ID: {
    type: Sequelize.INTEGER,
    references: {
      model: 'SickBayMedicationControlled',
      key: 'SickBayMedicationControlledID'
    }
  },
  CheckSchedule1: Sequelize.BOOLEAN,
  MatriculaNurseCheckSchedule1: {
    type: Sequelize.INTEGER,
    references: {
      model: 'usuarios',
      key: 'matricula'
    }
  },
  CheckSchedule2: Sequelize.BOOLEAN,
  MatriculaNurseCheckSchedule2: {
    type: Sequelize.INTEGER,
    references: {
      model: 'usuarios',
      key: 'matricula'
    }
  },
  CheckSchedule3: Sequelize.BOOLEAN,
  MatriculaNurseCheckSchedule3: {
    type: Sequelize.INTEGER,
    references: {
      model: 'usuarios',
      key: 'matricula'
    }
  },
  CheckSchedule4: Sequelize.BOOLEAN,
  MatriculaNurseCheckSchedule4: {
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
