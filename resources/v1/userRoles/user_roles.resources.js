'use strict';
const Op = require('sequelize').Op;
const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const UserRole = require('./user_role.model');


module.exports = class UserRolesResource {
    async createOne(data = null) {
    
        console.log('UserRolesResource@createOne');
        if (!data || data === '') {
            throw new Error('data is required');
        }
        
        let userRole = await UserRole.create(data);

        if (!userRole) {
            return false;
        }

        return userRole;
    }

    async findUserRoles(user_id = null){
        console.log("UserRolesResource@findUserRoles",user_id)
        if(!user_id || user_id === ''){
            throw new Error('user id is required');
        }
        try{
            let userRoles = await UserRole.findAll({
                where: {
                    user_id : user_id
                },
                attributes: ['role_id']
            })
    
            if(!userRoles){
                return false;
            }
    
            return userRoles;
        }
        catch(ex){
            console.log(ex.message)
            throw new Error(ex.message)
        }
        
    }

}