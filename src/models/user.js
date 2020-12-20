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

  // User.assosiate = (models) => {};

  return User;
};
