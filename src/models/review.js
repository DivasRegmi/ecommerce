const avgRatingForProduct = (sequelize, review, transaction) => {
  const { Review, Product } = sequelize.models;

  Product.findOne({
    where: {
      id: review.productId,
    },
    include: {
      model: Review,
      as: 'reviews',
    },
    transaction,
  })
    .then((product) => {
      const reviewArr = product.reviews;
      let totalRating = 0;
      for (let i = 0; i < reviewArr.length; i++) {
        const eachRating = reviewArr[i].rating;
        totalRating += parseInt(eachRating, 10);
      }
      const rating = (totalRating / reviewArr.length).toFixed(1);

      product.update({
        ...product,
        rating,
      });
    })
    .catch((err) => console.error(err));
};

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
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
    },
    {
      hooks: {
        afterUpdate: (review, options) => {
          const { transaction } = options;
          avgRatingForProduct(sequelize, review, transaction);
        },
        afterCreate: (review, options) => {
          const { transaction } = options;
          avgRatingForProduct(sequelize, review, transaction);
        },
      },
    }
  );
  Review.associate = (models) => {
    Review.belongsTo(models.Product, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
      as: 'reviews',
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
