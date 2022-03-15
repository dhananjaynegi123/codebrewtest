'use strict';
const Sequelize = require('sequelize');

module.exports = class BookingModel extends Sequelize.Model {
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
          staff_id: {
              type: DataTypes.INTEGER,
              references: {
                model: 'users',
                key: 'id',
              },
              onDelete: 'SET NULL'
          },
          station_id: {
              type: DataTypes.INTEGER,
              references: {
                model: 'users',
                key: 'id',
              },
              onDelete: 'SET NULL'
          },
          booking_date: {
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
            modelName: 'Booking',
            tableName: 'bookings',
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            underscored: true,
            sequelize,
        }
        )
    }

    static associate(models) {
       
    
      this.relationship = this.hasMany(models.BookingDetail, {
        as: 'booking_details',
        foreignKey: 'booking_id',
        onDelete: 'SET NULL',
      })

      this.relationship = this.belongsTo(models.User, {
        as: 'user_detail',
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
      })
      
      this.relationship = this.belongsTo(models.User, {
        as: 'staff_detail',
        foreignKey: 'staff_id',
        onDelete: 'SET NULL',
      })

      this.relationship = this.hasOne(models.UserProfile, {
        as: 'user_profiles',
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
      })

      this.relationship = this.hasOne(models.DealerStaff, {
        as: 'dealer_staff',
        foreignKey: 'id',
        onDelete: 'SET NULL',
      })
      
    }

}