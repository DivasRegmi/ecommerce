module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'CartProducts',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        cartId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: 'Carts',
            key: 'id',
            as: 'cartId',
          },
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
        quantity: {
          type: Sequelize.INTEGER,
          defaultValue: 1,
          validation: {
            min: 1,
          },
        },
        total: {
          type: Sequelize.INTEGER,
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
            fields: ['cartId', 'productId'],
          },
        },
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('CartsProducts');
  },
};
