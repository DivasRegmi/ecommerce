module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    imageUrls: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      get: function () {
        if (this.getDataValue('imageUrls').length === 0) {
          return ['/defaultproduct.jpg'];
        }
        return this.getDataValue('imageUrls');
      },
    },
    category: DataTypes.STRING,
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
    Product.belongsTo(models.Category, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false,
      },
      as: 'category',
    });
    Product.belongsToMany(models.Cart, { through: 'ProductCard' });
    Product.belongsToMany(models.User, { through: 'FavList' });
    Product.hasMany(models.Review, {
      foreignKey: {
        name: 'productId',
        allowNull: 'false',
      },
      as: 'review',
    });
  };

  return Product;
};
