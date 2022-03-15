'use strict';
const Sequelize = require('sequelize');

module.exports = class BookingDetailModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
        {
          id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          user_id: {
              type: DataTypes.INTEGER,
              references: {
                model: 'users',
                key: 'id',
              },
              onDelete: 'SET NULL'
          },
          booking_id: {
              type: DataTypes.INTEGER,
              references: {
                model: 'bookings',
                key: 'id',
              },
              onDelete: 'SET NULL'
          }, 
          vehicle_fuel_type: {
              type: DataTypes.STRING,
              allowNull: true
          },
          vehicle_name: {
              type: DataTypes.STRING,
              allowNull: true
          },
          is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
          }, 
          created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: new Date(),
          },
          updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            onUpdate: 'SET DEFAULT',
            defaultValue: new Date(),
          },
          deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
          }
        },
        {
            modelName: 'BookingDetail',
            tableName: 'booking_details',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
            sequelize,
        }
        )
    }

    // static associate(models) {
    //   this.relationship = this.hasOne(models.BookingDetail, {
    //       as: 'user_bookings',
    //       foreignKey: 'booking_id',
    //       onDelete: 'SET NULL',
    //   })
    // }
 

}