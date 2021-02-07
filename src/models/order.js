module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      userId: DataTypes.INTEGER,
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
    Order.belongsToMany(models.Product, {
      through: 'OrderProduct',
      as: 'products',
      foreignKey: 'productId',
      onDelete: 'cascade',
    });
  };

  return Order;
};
