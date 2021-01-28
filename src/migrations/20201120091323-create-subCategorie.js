module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SubCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      categorieId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
          as: 'categorieId',
        },
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('SubCategories');
  },
};
