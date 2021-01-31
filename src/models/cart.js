/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: DataTypes.NUMBER,
    productIdArr: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue(productIdArr);
        return rawValue ? rawValue.split(',') : null;
      },
    },
    quantityArr: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue(quantityArr);
        return rawValue ? rawValue.split(',') : null;
      },
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
