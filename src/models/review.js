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
      type: DataTypes.STRING,
    },

    reply: {
      type: DataTypes.STRING,
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.Product, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
    });
    Review.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });
  };
  return Review;
};
