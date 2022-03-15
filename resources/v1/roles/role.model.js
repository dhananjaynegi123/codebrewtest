'use strict';
const Sequelize = require('sequelize');

module.exports = class RoleModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                  },
                  name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                  },
                  slug: {
                    type: DataTypes.STRING,
                    allowNull: false,
                  },
                  description: {
                    type: DataTypes.TEXT,
                    allowNull: true,
                    defaultValue: null,
                  },
                  is_active: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: 0
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
                modelName: 'Role',
                tableName: 'roles',
                createdAt: 'created_at',
                updatedAt: 'updated_at',
                underscored: true,
                sequelize,
            }
        )
    }

}