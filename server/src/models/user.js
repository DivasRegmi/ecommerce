// const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      provider: DataTypes.STRING,
      mobile: DataTypes.BIGINT,
      address: DataTypes.STRING,
      oauthid: DataTypes.STRING,
    },
    {
      paranoid: true,
      hooks: {
        afterCreate: (user, options) => {
          const { transaction } = options;

          const { Cart } = sequelize.models;

          Cart.create({ userId: user.id }, { transaction })
            .then((cart) => console.log(JSON.stringify(cart)))
            .catch((err) => console.error(err));
        },
      },
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Cart, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'cart',
    });

    User.belongsToMany(models.Product, {
      through: 'FavProductList',
      as: 'favProductList',
      foreignKey: 'userId',
    });

    User.hasMany(models.Order, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'orders',
    });
  };

  return User;
};
