/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    imageArray: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('imageArray');
        return rawValue ? rawValue.split(',') : null;
      },
    },
    highlights: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('highlights');
        return rawValue ? rawValue.split(',') : null;
      },
    },
    brand: DataTypes.STRING,
    discription: DataTypes.TEXT,
    rating: DataTypes.NUMBER,
    favCount: DataTypes.NUMBER,
    isOutOfStock: DataTypes.NUMBER,
    costPrice: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    markedPrice: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    discountPercent: {
      type: DataTypes.NUMBER,
    },
    seelingPrice: {
      type: DataTypes.VIRTUAL,
      get() {
        const mp = parseInt(this.getDataValue('markedPrice'), 10);
        const dp = parseInt(this.getDataValue('discountPercent'), 10);
        const sp = mp - (dp / 100) * mp;
        return sp;
      },
      set() {
        throw new Error('Do not try to set the `fullName` value!');
      },
    },
  });

  Product.associate = (models) => {
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

    Product.belongsTo(models.SubCategorie, {
      foreignKey: {
        name: 'subCategorieId',
        allowNull: 'false',
      },
    });
  };

  return Product;
};
