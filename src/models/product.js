module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageUrls: DataTypes.STRING,
    categorieId: DataTypes.NUMBER,
    costprice: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    markedprice: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    brand: DataTypes.STRING,
    discription: DataTypes.TEXT,
    rating: DataTypes.NUMBER,
    favCount: DataTypes.NUMBER,
    isOutOfStock: DataTypes.NUMBER,
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Categorie, {
      foreignKey: {
        name: 'categorieId',
        allowNull: false,
      },
      as: 'product',
    });

    Product.belongsToMany(models.User, {
      through: 'FavList',
      as: 'favList',
    });

    Product.hasMany(models.Review, {
      foreignKey: {
        name: 'productId',
        allowNull: 'false',
      },
    });
  };

  return Product;
};
