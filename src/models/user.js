// const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
  });

  User.associate = (models) => {
    User.hasOne(models.Cart, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
    });

    User.belongsToMany(models.Product, {
      through: 'FavList',
      as: 'favLists',
      foreignKey: 'userId',
    });

    User.hasMany(models.Order, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      as: 'order',
    });
  };

  return User;
};
