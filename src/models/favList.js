module.exports = (sequelize, DataTypes) => {
  const FavList = sequelize.define('FavList', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return FavList;
};
