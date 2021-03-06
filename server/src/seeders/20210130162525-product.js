module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'products',
      [
        {
          name: 'adids',
          subCategorieId: 4,
          brand: 'mustang',
          discription: 'red apple, round',
          costPrice: 500,
          markedPrice: 30000,
          discountPercent: 20,
          rating: 5,
          highlights: 'fiber',
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'nike',
          subCategorieId: 4,
          brand: 'mustang',
          discription: 'red apple, round',
          costPrice: 500,
          markedPrice: 30000,
          discountPercent: 20,
          rating: 5,
          highlights: 'fiber',
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'nepali wallets',
          subCategorieId: 6,
          brand: 'mustang',
          discription: 'red apple, round',
          costPrice: 500,
          markedPrice: 30000,
          discountPercent: 20,
          rating: 5,
          highlights: 'fiber',
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'indian wallets',
          subCategorieId: 6,
          brand: 'mustang',
          discription: 'red apple, round',
          costPrice: 500,
          markedPrice: 30000,
          discountPercent: 20,
          rating: 5,
          highlights: 'fiber',
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'blue jeans',
          subCategorieId: 1,
          brand: 'mustang',
          discription: 'red apple, round',
          costPrice: 500,
          markedPrice: 30000,
          discountPercent: 20,
          rating: 5,
          highlights: 'fiber',
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'black jeans',
          subCategorieId: 1,
          brand: 'mustang',
          discription: 'red apple, round',
          costPrice: 500,
          markedPrice: 30000,
          discountPercent: 20,
          rating: 5,
          highlights: 'fiber',
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'half jeans',
          subCategorieId: 1,
          brand: 'mustang',
          discription: 'red apple, round',
          costPrice: 500,
          markedPrice: 30000,
          discountPercent: 20,
          rating: 5,
          highlights: 'fiber',
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'cotton pants',
          subCategorieId: 2,
          brand: 'mustang',
          discription: 'red apple, round',
          costPrice: 500,
          markedPrice: 30000,
          discountPercent: 20,
          rating: 5,
          highlights: 'fiber',
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'red pants',
          subCategorieId: 2,
          brand: 'mustang',
          discription: 'red apple, round',
          costPrice: 500,
          markedPrice: 30000,
          discountPercent: 20,
          rating: 5,
          highlights: 'fiber',
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'red bag',
          subCategorieId: 7,
          brand: 'mustang',
          discription: 'red apple, round',
          costPrice: 500,
          markedPrice: 30000,
          discountPercent: 20,
          rating: 5,
          highlights: 'fiber',
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
