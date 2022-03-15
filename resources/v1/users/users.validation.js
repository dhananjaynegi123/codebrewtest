const _ = require('lodash');
const Joi = require('joi');
const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const UsersResource = require('./users.resources');
const _User = new UsersResource();

const RoleResource = require('./../roles/roles.resources');
const _Role = new RoleResource()

const UserRolesResource = require('./../userRoles/user_roles.resources')
const _UserRole = new UserRolesResource()
 
module.exports = class UsersValidation {
    
    async createOne(req, res, next) {
        console.log('UsersValidation@createOne');
        
        let schema = {
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().required(),
            confirm_password: Joi.string().required().valid(Joi.ref('password')).error(() => {
                return {
                  message: 'Confirm password should match to password field.',
                };
            }),
            role_id: Joi.number().integer().required()
        }


        // make sure password meets minimum requirements
        let passwordCheck = await _DataHelper.passwordRegex(req.body.password);

        if(!passwordCheck) {
            return response.badRequest('insecure password. password must be at least 8 characters long, with 1 capital letter, 1 number and 1 special character', res, false);
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);

        if(errors) {
            return response.badRequest('invalid request data', res, errors);
        }

        // check if the passwords match
        if(req.body.password !== req.body.confirm_password) {
            return response.badRequest('passwords do not match', res, false);
        }

        // check if a user with that email already exists
        let user = await _User.getByEmail(req.body.email);

        if(user) {
            return response.conflict('a user with this email already exists', res, false);
        };


        // Check if a role is exists in our database
        let role = await _Role.getOne(req.body.role_id);

        if(!role){
            return response.conflict('role id not exists in our record', res, false);
        }

        next();
    }
    

    async createStaff(req, res, next) {
        console.log('UsersValidation@createOne');
        
        let schema = {
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().required(),
            confirm_password: Joi.string().required().valid(Joi.ref('password')).error(() => {
                return {
                  message: 'Confirm password should match to password field.',
                };
            })
        }


        // make sure password meets minimum requirements
        let passwordCheck = await _DataHelper.passwordRegex(req.body.password);

        if(!passwordCheck) {
            return response.badRequest('insecure password. password must be at least 8 characters long, with 1 capital letter, 1 number and 1 special character', res, false);
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);

        if(errors) {
            return response.badRequest('invalid request data', res, errors);
        }

        // check if the passwords match
        if(req.body.password !== req.body.confirm_password) {
            return response.badRequest('passwords do not match', res, false);
        }

        // check if a user with that email already exists
        let user = await _User.getByEmail(req.body.email);

        if(user) {
            return response.conflict('a user with this email already exists', res, false);
        };


    

        next();
    }

    async login(req,res,next){
        console.log("UsersValidation@login");

        let schema = {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);

        if(errors) {
            return response.badRequest('invalid request data', res, errors);
        }

        // Check this email address exists in our records
        let user = await _User.getByEmail(req.body.email)

        if(!user){
            return response.notFound('invalid email address', res, false);
        }

        // check valid password match for req user
        let isPasswordValid = await _DataHelper.validatePassword(req.body.password,user.password)

        if(!isPasswordValid){
            return response.conflict("password not matched",res,false)
        }

        req.user = user
        next()
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