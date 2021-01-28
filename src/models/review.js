const { Products } = require('./index');

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
        afterCreate: (review, options, cb) => {
          Products.findOne({
            where: {
              id: review.productId,
            },
            include: [Review],
          })
            .then((product) => {
              const reviewArr = product.review;
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
            .catch((err) => cb(err, options));

          cb(null, options);
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
