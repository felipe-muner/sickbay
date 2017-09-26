'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.renameColumn('SickBayArea', 'UnitID', 'Unit_ID'),

      queryInterface.renameColumn('SickBayNurseArea', 'SickBayAreaID', 'SickBayArea_ID')
    ])
  },

  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.renameColumn('SickBayArea', 'Unit_ID', 'UnitID'),

      queryInterface.renameColumn('SickBayNurseArea', 'SickBayArea_ID', 'SickBayAreaID')
    ])
  }
};
