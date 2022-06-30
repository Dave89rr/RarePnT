'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Spots', 'latitude', {
        type: Sequelize.NUMERIC(9, 7),
        allowNull: true,
      }),
      queryInterface.addColumn('Spots', 'longitude', {
        type: Sequelize.NUMERIC(10, 7),
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
