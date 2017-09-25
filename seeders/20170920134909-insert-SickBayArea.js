'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SickBayArea', [
      {Name: 'Cashman Botafogo', UnitID: 1},
      {Name: 'Nursery Botafogo', UnitID: 1},
      {Name: 'Pré-Nursery Botafogo', UnitID: 1},
      {Name: 'Urca', UnitID: 2},
      {Name: 'Principal Barra', UnitID: 3},
      {Name: 'Piscina Barra', UnitID: 3}
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('SickBayArea', null, {})
  }
}
