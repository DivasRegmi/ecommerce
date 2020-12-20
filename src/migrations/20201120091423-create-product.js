module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      costprice: {
        type: Sequelize.INTEGER,
      },
      markedprice: {
        type: Sequelize.STRING,
      },
      discription: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.INTEGER,
      },
      isPopular: {
        type: Sequelize.BOOLEAN,
      },
      favCount: {
        type: Sequelize.INTEGER,
      },
      isOutOfStock: {
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
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Products');
  },
};
