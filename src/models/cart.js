module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: DataTypes.NUMBER,
    ProductIdArr: DataTypes.STRING,
    quantityArr: DataTypes.STRING,
    cost: DataTypes.NUMBER,
    status: DataTypes.BOOLEAN,
    noOfItem: DataTypes.NUMBER,
  });
  return Cart;
};
