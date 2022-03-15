'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
          type: Sequelize.STRING,
          allowNull: true
      },
      password: {
          type: Sequelize.STRING,
          allowNull: true
      }, 
      phone_no: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_block:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      lat: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      lng: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
