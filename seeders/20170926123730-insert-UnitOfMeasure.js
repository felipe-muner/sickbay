'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UnitOfMeasure', [
      {Name: 'Comprimido', SickBay: true},
      {Name: 'Unidade', SickBay: true},
      {Name: 'Gota', SickBay: true},
      {Name: 'Mililitro', SickBay: true},
      {Name: 'Copo', SickBay: true},
      {Name: 'Cápsula', SickBay: true},
      {Name: 'Aplicação', SickBay: true}
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UnitOfMeasure', null, {})
  }
}
