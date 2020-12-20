module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    costprice: DataTypes.NUMBER,
    markedprice: DataTypes.STRING,
    discription: DataTypes.STRING,
    image: DataTypes.STRING,
    rating: DataTypes.NUMBER,
    isPopular: DataTypes.BOOLEAN,
    favCount: DataTypes.NUMBER,
    isOutOfStock: DataTypes.NUMBER,
  });
  return Product;
};
