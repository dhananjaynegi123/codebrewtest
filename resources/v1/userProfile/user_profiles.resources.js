'use strict';
const Op = require('sequelize').Op;
const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const UserProfile = require('./user_profile.model');
 
module.exports = class UserProfilesResource {
    
    async createOne(data = null) {
        console.log('UserProfilesResource@createOne');
        if (!data || data === '') {
            throw new Error('data is required');
        }
        
        let userProfile = await UserProfile.create(data);

        if (!userProfile) {
            return false;
        }

        return userProfile;
    }
    

}