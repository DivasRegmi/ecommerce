module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: DataTypes.NUMBER,
    ProductIdArr: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    quantityArr: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    cost: DataTypes.NUMBER,
    status: DataTypes.BOOLEAN,
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
