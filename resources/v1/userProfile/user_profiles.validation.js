const _ = require('lodash');
const Joi = require('joi');
const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const UserProfilesResource = require('./user_profiles.resources');
const _UserProfile = new UserProfilesResource();


module.exports = class UserProfilesValidation {
    
    async createOne(req, res, next) {
        console.log('UserProfilesValidation@createOne');
        
        let schema = {
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            business_phone_code: Joi.string().optional(),
            business_phone: Joi.string().optional(),
            gender: Joi.string().required().valid('male','female','other'),
            dob: Joi.string().optional(),
            business_address: Joi.string().optional(),
            city: Joi.string().optional(),
            state: Joi.string().optional(),
            country: Joi.string().optional(),
            zipcode: Joi.string().optional(),
            allow_mobile_visit: Joi.boolean().optional(),
            personal_statement: Joi.string().optional(),
            profile_photo: Joi.string().optional(),
            mission_statement: Joi.string().optional()
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);

        if(errors) {
            return response.badRequest('invalid request data', res, errors);
        }

        if(req.body.business_phone){
            let phoneNumber = req.body.business_phone;
            let errors = await _DataHelper.checkPhoneNumber(phoneNumber);
            if(errors) {
                return response.badRequest('not valid phone number', res, errors);
            }
        }

        next();
    }

    async updateOne(req, res, next) {
        console.log('UserProfilesValidation@updateOne');
        if (!req.params.id || req.params.id === '') {
            return response.badRequest('id is required', res, false);
        }

        // make sure the user exists
        let userProfile = await _UserProfile.getOne(req.params.id);

        if(!userProfile) {
            return response.notFound('user profile not found', res, false);
        };

        let schema = {
            firstname: Joi.string().required(),
            lastname: Joi.string().required(),
            personal_statement: Joi.string().optional().allow(null,''),
            gender: Joi.string().required().valid('male','female','other'),
            dob: Joi.string().optional().allow(null,''),
            business_address: Joi.string().optional().allow(null,''),
            city: Joi.string().optional().allow(null,''),
            state: Joi.string().optional().allow(null,''),
            zipcode: Joi.string().optional().allow(null,''),
            business_phone: Joi.string().optional().allow(null,''),
            profile_photo: Joi.string().optional().allow(null,''),
            mission_statement: Joi.string().optional().allow(null,''),
            allow_mobile_visit: Joi.boolean().optional().allow(null,'')
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);

        if(errors) {
            return response.badRequest('invalid request data', res, errors);
        }

        if(req.body.business_phone){
            let phoneNumber = req.body.business_phone;
            let errors = await _DataHelper.checkPhoneNumber(phoneNumber);
            if(errors) {
                return response.badRequest('not valid phone number', res, errors);
            }
        }

        req.userProfile = userProfile;

        next();
    }


    async getOneByUserId(req, res, next){
        console.log("UserProfilesValidation@getOneByUserId")
        next()
    }

    async createProfile(req, res, next){
        console.log("UserProfileValidation@createProfile")
        next()
    }

    async getAutoCompleteAddress(req, res, next){
        console.log("UserProfileValidation@getAutoCompleteAddress")

        let place = req.query.place
        if(!place){
            return response.badRequest('invalid request data', res, false); 
        }
        
        next()
    }

    async getPlaceDetails(req, res, next){
        console.log("UserProfileValidation@getPlaceDetails")

        if(!req.params.placeId){
            return response.badRequest('invalid request data', res, false); 
        }
        
        next()
    }

}