module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'FavProductLists',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
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
        productId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Products',
            key: 'id',
            as: 'productId',
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
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
    await queryInterface.dropTable('FavProductLists');
  },
};
