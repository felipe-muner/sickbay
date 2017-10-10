'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('perfis_acesso_sistemas',
      'all_units', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('perfis_acesso_sistemas', 'all_units')
  }
}
