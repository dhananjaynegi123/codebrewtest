'use strict';
const Op = require('sequelize').Op;
const sequelize = require('sequelize')
const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const User = require('./user.model');
const DealerStaff = require('./dealer_staff.model');
const UserProfile = require('../userProfile/user_profile.model');

const RolesResource = require('../roles/roles.resources')
const _Role = new RolesResource();

module.exports = class UsersResource {
    
    async createOne(data = null) {
     
        if (!data || data === '') {
            throw new Error('data is required');
        }
        
        let user = await User.create(data);

        if (!user) {
            return false;
        }

        return user;
    }

    async createStaff(data = null) {
     
        if (!data || data === '') {
            throw new Error('data is required');
        }
        
        let user = await DealerStaff.create(data);

        if (!user) {
            return false;
        }

        return user;
    }

     
    async getByEmail(email) { 
        let results;

        try {
            results = await User.findOne({
                where: {
                    email: email,
                },
                raw: true,
            });
        } catch (err) {
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

        if(!results) {
            return false;
        }

        return results;
    }

    async getOne(id){
         
        if (!id || id === '') {
            throw new Error('id is required');
        }

        let user = User.findOne({
            where: {
                id: id
            }
        })

        if(!user){
            return false;
        }

        return user;
    }
    async getNearby(lat,lng){
        
         
        let users = User.findAll({
            attributes: ['id',[sequelize.literal("6371 * ACOS( COS( RADIANS( lat ) ) * COS( RADIANS( '"+lat+"' ) ) * COS( RADIANS( '"+lng+"' ) - RADIANS( lng ) ) + SIN( RADIANS( lat ) ) * SIN( RADIANS( '"+lat+"') ) )"),'distance']],
            include: [
                {
                    association: 'user_profiles'
                },
                {
                    association: 'user_roles',
                    where: { role_id: 2 },
                    attributes: []
                }
            ],
          order: sequelize.col('distance','asc'),
          limit: 1000
        });

        if(!users){
            return false;
        }

        return users;
    }

}