module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'clothing',
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'shoes',
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
        {
          name: 'mens bag',
          createdAt: '2021-01-30 21:15:05',
          updatedAt: '2021-01-30 21:15:05',
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
