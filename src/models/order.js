module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.NUMBER,
    productId: DataTypes.STRING,
    cartId: DataTypes.STRING,
    cost: DataTypes.NUMBER,
    mobileNumber: DataTypes.NUMBER,
    location: DataTypes.STRING,
  });

  return Order;
};
