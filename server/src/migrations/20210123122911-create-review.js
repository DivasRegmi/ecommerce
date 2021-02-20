module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Reviews',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        rating: {
          type: Sequelize.INTEGER,
          validate: {
            min: 0,
            max: 5,
          },
        },
        comment: {
          type: Sequelize.STRING,
        },

        reply: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        productId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: 'Products',
            key: 'id',
            as: 'productId',
          },
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
            as: 'userId',
          },
        },
      },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ['userId', 'productId'],
          },
        },
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Reviews');
  },
};
