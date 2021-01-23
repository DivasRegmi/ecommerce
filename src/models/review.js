module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },

    reply: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.Product, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
      as: 'review',
    });
    Review.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'review',
    });
  };
  return Review;
};
