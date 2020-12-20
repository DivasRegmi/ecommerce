module.exports = (sequelize, DataTypes) => {
  const CompletedCart = sequelize.define('CompletedCart', {
    userId: DataTypes.NUMBER,
    ProductIdArr: DataTypes.STRING,
    quantityArr: DataTypes.STRING,
    cost: DataTypes.NUMBER,
    noOfItem: DataTypes.NUMBER,
  });
  return CompletedCart;
};
