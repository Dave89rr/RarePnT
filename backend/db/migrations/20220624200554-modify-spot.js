'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Spots', 'latitude', {
        type: Sequelize.NUMERIC(6, 4),
        allowNull: true,
      }),
      queryInterface.addColumn('Spots', 'longitude', {
        type: Sequelize.NUMERIC(7, 4),
        allowNull: true,
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Spots', 'latitude'),
      queryInterface.removeColumn('Spots', 'longitude'),
    ]);
  },
};
