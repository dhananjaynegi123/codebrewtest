'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    

    await queryInterface.bulkInsert('roles', [
      { 
        name: 'Customer',
        slug: 'customer',
        description: 'This is customer role for future use',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Dealer',
        slug: 'dealer',
        description: 'This is dealer role for future use',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Staff',
        slug: 'staff',
        description: 'This is staff role for future use',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('roles', null, {});
  }
};
