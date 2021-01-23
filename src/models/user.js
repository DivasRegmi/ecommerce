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
    favlist: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.belongsTo(models.Product, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
      as: 'review',
    });
    User.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'review',
    });
  };

  return User;
};
