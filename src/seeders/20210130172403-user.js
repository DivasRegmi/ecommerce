module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          name: 'Divas Regmi',
          email: 'divasregmi@gmail.com',
          provider: 'facebook',
          mobile: null,
          address: null,
          oauthid: '195939848872395',
          createdAt: '2021-01-30T17:22:59.000Z',
          updatedAt: '2021-01-30T17:22:59.000Z',
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
