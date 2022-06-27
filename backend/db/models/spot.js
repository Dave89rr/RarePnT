'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define(
    'Spot',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      latitude: {
        allowNull: true,
        type: DataTypes.NUMERIC(6, 4),
      },
      longitude: {
        allowNull: true,
        type: DataTypes.NUMERIC(7, 4),
      },
    },
    {}
  );
  Spot.associate = function (models) {
    Spot.hasMany(models.Image, {
      foreignKey: 'spotId',
      onDelete: 'CASCADE',
      hooks: true,
    });
    Spot.hasMany(models.Review, {
      foreignKey: 'spotId',
      onDelete: 'CASCADE',
      hooks: true,
    });
    Spot.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Spot;
};
