'use strict';
const Sequelize = require('sequelize');

module.exports = class DealerStaffModel extends Sequelize.Model {
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
                  dealer_id: {
                      type: DataTypes.INTEGER,
                      references: {
                        model: 'users',
                        key: 'id',
                      },
                      onDelete: 'SET NULL'
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
                modelName: 'DealerStaff',
                tableName: 'dealer_staff',
                createdAt: 'created_at',
                updatedAt: 'updated_at',
                underscored: true,
                sequelize,
            }
        )
    }

    static associate(models) {
      this.relationship = this.belongsTo(models.Booking, {
          as: 'user_detail',
          foreignKey: 'id',
          onDelete: 'SET NULL',
      })

      this.relationship = this.belongsTo(models.User, {
          as: 'dealer_detail',
          foreignKey: 'dealer_id',
          onDelete: 'SET NULL',
      })
    }

}