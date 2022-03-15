const _ = require('lodash');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const DataHelper = require('../../../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

const UserProfilesResource = require('./user_profiles.resources');
const _UserProfile = new UserProfilesResource();

 

 

module.exports = class UserProfilesController {
    
    async createOne(req,res){
        
        console.log('UserProfilesController@createOne');

        let data = _.pick(req.body,['firstname','lastname','personal_statement','gender','dob','business_address','city','state','zipcode','business_phone','profile_photo','mission_statement','allow_mobile_visit', 'country', 'business_phone_code'])

        data.user_id = req.user.id;
        let userProfile; 

        // Check user have already profile set before
        let isProfileCheck = await _UserProfile.getByUserId(data.user_id)

        if(isProfileCheck){
            return response.exception('user profile already created before.', res, false);
        }

         

        userProfile = await _UserProfile.createOne(data);
        
        if (!userProfile) {
            return response.exception('user profile not created successfully', res, false);
        }

        return response.created('user profile created successfully', res, userProfile);
    }


}   