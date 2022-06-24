'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {}
  );
  Image.associate = function (models) {
    Image.belongsTo(models.Spot, { foreignKey: 'spotId' });
  };
  return Image;
};
