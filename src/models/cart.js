/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    totalCost: DataTypes.INTEGER,
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      as: 'cart',
    });

    Cart.belongsToMany(models.Product, {
      through: 'CartProduct',
      as: 'cartProducts',
      foreignKey: 'cartId',
    });
  };

  return Cart;
};
