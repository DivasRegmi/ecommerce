module.exports = (sequelize, DataTypes) => {
  const FavList = sequelize.define(
    'FavList',
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productId: {
        type: DataTypes.STRING,
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

  return FavList;
};
