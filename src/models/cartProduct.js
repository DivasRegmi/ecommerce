const getProductTotal = async (cartProduct, sequelize) => {
  const { Product } = sequelize.models;

  try {
    const { productId, quantity } = cartProduct;
    const product = await Product.findByPk(productId);

    const itemPrice = product.seelingPrice;
    // eslint-disable-next-line no-param-reassign
    cartProduct.total = itemPrice * quantity;
    return cartProduct.save();
  } catch (error) {
    console.error(error);
  }
};

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
        afterCreate: (cartProduct) => {
          getProductTotal(cartProduct, sequelize);
        },
        afterUpdate: (cartProduct) => {
          getProductTotal(cartProduct, sequelize);
        },
      },
    }
  );

  return CartProduct;
};
