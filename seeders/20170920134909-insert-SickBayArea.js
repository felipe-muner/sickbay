'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SickBayArea', [
      {Name: 'Cashman Botafogo', Unit_ID: 1},
      {Name: 'Nursery Botafogo', Unit_ID: 1},
      {Name: 'Pré-Nursery Botafogo', Unit_ID: 1},
      {Name: 'Urca', Unit_ID: 2},
      {Name: 'Principal Barra', Unit_ID: 3},
      {Name: 'Piscina Barra', Unit_ID: 3}
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('SickBayArea', null, {})
  }
}
