const _ = require('lodash');
const Joi = require('joi');
const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const UsersResource = require('./../users/users.resources');
const _User = new UsersResource();

const RoleResource = require('./../roles/roles.resources');
const _Role = new RoleResource();

module.exports = class UsersValidation {
    
    async createOne(req, res, next) {
        console.log('UsersValidation@createOne');
        
        let schema = {
            user_id: Joi.number().integer().required(),
            role_id: Joi.number().integer().required()
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);

        if(errors) {
            return response.badRequest('invalid request data', res, errors);
        }


        // check if a user id exists in our record
        let user = await _User.getOne(req.body.user_id);

        if(!user) {
            return response.conflict('a user with id is not in our record.', res, false);
        };

        // check if a role id exists in our record   
        let role = await _Role.getOne(req.body.role_id);     

        if(!role){
            return response.conflict('a role with id is not in our record',res,false)
        }

        next();
    }

}