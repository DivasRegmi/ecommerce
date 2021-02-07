const fs = require('fs');
const path = require('path');
const { productImageSavingLocation } = require('../../config/config');

/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
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
      brand: {
        type: DataTypes.STRING,
        defaultValue: 'None',
      },
      discription: DataTypes.TEXT,
      rating: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
      },

      costPrice: {
        type: DataTypes.NUMBER,
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
          throw new Error('Do not try to set the `seelingPrice` value!');
        },
      },
    },
    {
      paranoid: true,
      hooks: {
        afterDestroy: (product) => {
          const images = product.imageArray;
          for (let i = 0; i < images.length; i++) {
            const filePath = path.join(productImageSavingLocation, images[i]);

            fs.unlinkSync(filePath, (err) => {
              if (err) return console.log(err);
              console.log('file deleted successfully');
            });
          }
        },
      },
    }
  );

  Product.associate = (models) => {
    Product.belongsToMany(models.User, {
      through: 'FavProductList',
      as: 'users',
      foreignKey: 'productId',
      onDelete: 'cascade',
    });

    Product.belongsToMany(models.Cart, {
      through: 'CartProduct',
      as: 'carts',
      foreignKey: 'productId',
      onDelete: 'cascade',
    });
    Product.belongsToMany(models.Order, {
      through: 'OrderProduct',
      as: 'orders',
      foreignKey: 'productId',
      onDelete: 'cascade',
    });

    Product.hasMany(models.Review, {
      foreignKey: {
        name: 'productId',
        allowNull: 'false',
      },
      as: 'reviews',
    });

    Product.belongsTo(models.SubCategorie, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'subCategorieId',
        allowNull: 'false',
      },
    });
  };

  return Product;
};
