module.exports = (sequelize, DataTypes) => {
  const CartProduct = sequelize.define(
    'CartProduct',
    {
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        validation: {
          min: 1,
        },
      },
      total: {
        type: DataTypes.INTEGER,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['cartId', 'productId'],
        },
      ],
      hooks: {
        beforeCreate: (cartProduct) => {
          const itemPrice = sequelize.models.product.getSeelingPrice({
            where: { id: cartProduct.productId },
          });
          const { quantity } = cartProduct;

          // eslint-disable-next-line no-param-reassign
          cartProduct.total = itemPrice * quantity;
        },
      },
    }
  );

  return CartProduct;
};
