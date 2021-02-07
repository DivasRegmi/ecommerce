module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'OrderProducts',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        orderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: 'Orders',
            key: 'id',
            as: 'orderId',
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
            fields: ['orderId', 'productId'],
          },
        },
      }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('OrderProducts');
  },
};
