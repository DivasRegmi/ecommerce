module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: DataTypes.NUMBER,
    ProductIdArr: {
      type: DataTypes.STRING,
    },
    quantityArr: {
      type: DataTypes.STRING,
    },
    cost: DataTypes.NUMBER,
    noOfItem: DataTypes.NUMBER,
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      foreignKey: {
        name: 'userID',
        allowNull: false,
      },
      as: 'cart',
    });
  };

  return Cart;
};
