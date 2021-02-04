module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.NUMBER,
    cartId: DataTypes.STRING,
    cost: DataTypes.NUMBER,
    mobileNumber: DataTypes.NUMBER,
    location: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      as: 'order',
    });
    Order.belongsTo(models.Cart, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'cartId',
        allowNull: false,
      },
      as: 'cart',
    });
  };

  return Order;
};
