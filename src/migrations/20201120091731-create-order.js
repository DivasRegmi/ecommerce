module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
      cartId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Carts',
          key: 'id',
          as: 'cartId',
        },
      },
      cost: {
        type: Sequelize.INTEGER,
      },
      mobileNumber: {
        type: Sequelize.INTEGER,
      },
      location: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Orders');
  },
};
