module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      userId: DataTypes.INTEGER,
      productIdArr: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('productIdArr');
          return rawValue ? rawValue.split(',') : null;
        },
      },
      quantityIdArr: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue('quantityIdArr');
          return rawValue ? rawValue.split(',') : null;
        },
      },
      mobileNumber: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        validate: {
          is: /^98\d{8}$/i,
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('complete', 'pending'),
        defaultValue: 'pending',
      },
    },
    {
      paranoid: true,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      onDelete: 'cascade',
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'user',
    });
    // Order.belongsTo(models.Cart, {
    //   onDelete: 'cascade',
    //   foreignKey: {
    //     name: 'cartId',
    //     allowNull: false,
    //   },
    //   as: 'cart',
    // });
  };

  return Order;
};
