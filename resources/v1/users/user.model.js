'use strict';
const Sequelize = require('sequelize');

module.exports = class UserModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                  id: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                  },
                  email: {
                    type: DataTypes.STRING,
                    allowNull: true,
                  },
                  password: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    defaultValue: null
                  },
                  phone_no: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    defaultValue: null
                  }, 
                  is_active: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                  },
                  lat: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    defaultValue: null
                  },
                  lng: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    defaultValue: null
                  },
                  is_block:{
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                    defaultValue: false
                  },
                  created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: new Date()
                  },
                  updated_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    onUpdate: 'SET DEFAULT',
                    defaultValue: new Date()
                  },
                  deleted_at: {
                    type: DataTypes.DATE,
                    allowNull: true
                  }
            },
            {
                modelName: 'User',
                tableName: 'users',
                createdAt: 'created_at',
                updatedAt: 'updated_at',
                underscored: true,
                sequelize,
            }
        )
    }

    static associate(models) {
      
      this.relationship = this.hasOne(models.UserProfile, {
        as: 'user_profiles',
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
      })

      this.relationship = this.hasOne(models.DealerStaff, {
        as: 'dealer_detail',
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
      })
 
    
      this.relationship = this.hasMany(models.UserRole, {
        as: 'user_roles',
        foreignKey: 'user_id',
        onDelete: 'SET NULL',
      })
  

      this.relationship = this.hasMany(models.ApiToken, {
        as: 'api_tokens',
        foreignKey: 'user_id',
        onDelete: 'SET NULL'
      })
 
      
    }

}