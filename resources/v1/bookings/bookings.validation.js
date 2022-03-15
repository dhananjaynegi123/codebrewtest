const _ = require('lodash');
const Joi = require('joi');
const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const BookingsResource = require('./bookings.resources');
const _Booking = new BookingsResource();

const RoleResource = require('./../roles/roles.resources');
const _Role = new RoleResource()

const UserRolesResource = require('./../userRoles/user_roles.resources')
const _UserRole = new UserRolesResource()

const UserResource = require('./../users/users.resources')
const _User = new UserResource()


 
module.exports = class BookingsValidation {
    
    async createOne(req, res, next) {
        console.log('UsersValidation@createOne');
        
        let schema = {
            station_id: Joi.number().required(),
            booking_details: Joi.array().items({
                    vehicle_fuel_type: Joi.string().required(),
                    vehicle_name: Joi.string().required()
            }).required()
        }

 
        let errors = await _DataHelper.joiValidation(req.body, schema);

        if(errors) {
            return response.badRequest('invalid request data', res, errors);
        }

         


        // Check if a role is exists in our database
        let role = await _User.getOne(req.body.station_id);

        if(!role){
            return response.conflict('This fuel station not exists in our database', res, false);
        }

        next();
    }
 

     

    async search(req, res, next) {
        console.log('UsersValidation@createOne');
        
        let schema = {
            lat: Joi.string().required(),
            long: Joi.string().required()
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);

        if(errors) {
            return response.badRequest('invalid request data', res, errors);
        }
 

        next();
    }
     
}