'use strict';
const Sequelize = require('sequelize');

module.exports = class UserRoleModel extends Sequelize.Model {
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
                    type: DataTypes.INTEGER(11),
                    references: {
                      model: 'users',
                      key: 'id',
                    },
                    onDelete: 'SET NULL',
                  },
                  role_id: {
                    type: DataTypes.INTEGER(11),
                    allowNull: true,
                    references: {
                      model: 'roles',
                      key: 'id',
                    },
                    onDelete: 'SET NULL',
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
                modelName: 'UserRole',
                tableName: 'user_roles',
                createdAt: 'created_at',
                updatedAt: 'updated_at',
                underscored: true,
                sequelize,
            }
        )
    }

    static associate(models) {
      this.relationship = this.belongsTo(models.Role, {
          as: 'role',
          foreignKey: 'role_id',
          onDelete: 'SET NULL',
      })
    }

}