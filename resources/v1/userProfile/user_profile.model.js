'use strict';
const Sequelize = require('sequelize');

module.exports = class UserProfileModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                  type: DataTypes.INTEGER(11),
                  allowNull: false,
                  primaryKey: true,
                  autoIncrement: true
                },
                user_id: {
                  type: DataTypes.INTEGER(11),
                  references: {
                    model: 'users',
                    key: 'id',
                  },
                  onDelete: 'SET NULL'
                }, 
                firstname: {
                  type: DataTypes.STRING,
                  allowNull: true
                },
                lastname: {
                  type: DataTypes.STRING,
                  allowNull: true,
                },
                gender: {
                  type: DataTypes.ENUM('male','female','other'),
                  allowNull: true,
                  defaultValue: null
                },
                dob: {
                  type: DataTypes.DATE,
                  allowNull: true,
                  defaultValue: null
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
                modelName: 'UserProfile',
                tableName: 'user_profiles',
                createdAt: 'created_at',
                updatedAt: 'updated_at',
                underscored: true,
                sequelize,
            }
        )
    }

}