'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('perfis_acesso_sistemas', 'all_units')
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('perfis_acesso_sistemas',
      'all_units', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    )
  }
}
