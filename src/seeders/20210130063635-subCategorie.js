module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'SubCategories',
      [
        {
          name: 'jeans',
          categorieId: 1,
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'pants',
          categorieId: 1,
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'suits',
          categorieId: 2,
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'formal shoes',
          categorieId: 2,
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'boots',
          categorieId: 1,
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'wallets',
          categorieId: 3,
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'crossboy bag',
          categorieId: 3,
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SubCategories', null, {});
  },
};
