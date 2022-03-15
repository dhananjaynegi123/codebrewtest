'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('booking_details', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
          onDelete: 'SET NULL'
      },
      booking_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'bookings',
            key: 'id',
          },
          onDelete: 'SET NULL'
      }, 
      vehicle_fuel_type: {
          type: Sequelize.STRING,
          allowNull: true
      },
      vehicle_name: {
          type: Sequelize.STRING,
          allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }, 
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        onUpdate: 'SET DEFAULT',
        defaultValue: new Date(),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
