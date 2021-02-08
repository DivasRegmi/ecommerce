module.exports = (sequelize, DataTypes) => {
  const FavProductList = sequelize.define(
    'FavProductList',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['userId', 'productId'],
        },
      ],
    }
  );

  return FavProductList;
};
