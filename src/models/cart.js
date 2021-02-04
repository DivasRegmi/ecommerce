/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'cart',
    });

    Cart.belongsToMany(models.Product, {
      onDelete: 'cascade',
      through: 'CartProduct',
      as: 'cartProducts',
      foreignKey: 'cartId',
    });
  };

  return Cart;
};
