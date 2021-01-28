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
        allowNull: false,
        unique: true,
      },
      discription: {
        type: Sequelize.TEXT,
      },
      highlights: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
      costPrice: {
        type: Sequelize.INTEGER,
      },
      markedPrice: {
        type: Sequelize.INTEGER,
      },
      discountPercent: {
        type: Sequelize.INTEGER,
      },

      imageArray: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.INTEGER,
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
      subCategorieId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'SubCategories',
          key: 'id',
          as: 'subCategorieId',
        },
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Products');
  },
};
