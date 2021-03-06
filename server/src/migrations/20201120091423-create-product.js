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
        defaultValue: 'None',
      },
      costPrice: {
        type: Sequelize.INTEGER,
      },
      markedPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discountPercent: {
        type: Sequelize.INTEGER,
      },

      imageArray: {
        type: Sequelize.TEXT,
      },
      rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
      subCategorieId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
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
