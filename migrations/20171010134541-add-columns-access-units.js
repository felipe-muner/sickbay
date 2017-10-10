'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('perfis_acesso_sistemas',
        'AccessBotafogo', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        }
      ),

      queryInterface.addColumn('perfis_acesso_sistemas',
        'AccessUrca', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        }
      ),

      queryInterface.addColumn('perfis_acesso_sistemas',
        'AccessBarra', {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        }
      )
    ])
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('perfis_acesso_sistemas', 'AccessBotafogo'),
      queryInterface.removeColumn('perfis_acesso_sistemas', 'AccessUrca'),
      queryInterface.removeColumn('perfis_acesso_sistemas', 'AccessBarra')
    ])
  }
}
