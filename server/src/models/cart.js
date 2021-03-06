/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    total: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      defaultValue: 0,
      get() {
        const products = this.getDataValue('products');

        let total = 0;
        if (products) {
          products.forEach((product) => {
            total += product.CartProduct.total;
          });
        }
        return total;
      },
      set() {
        throw new Error('Do not try to set the `total` value!');
      },
    },
    ordered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
      as: 'products',
      foreignKey: 'cartId',
    });
  };

  return Cart;
};
