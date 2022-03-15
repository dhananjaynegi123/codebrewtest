'use strict';
require('dotenv').config();
const _ = require('lodash');
const jwt = require('jsonwebtoken')
const ResponseHelper = require('../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const UsersResource = require('./../../resources/v1/users/users.resources')
const _User = new UsersResource()

const RolesResource = require('./../../resources/v1/roles/roles.resources');
const _Role = new RolesResource()

const UserRolesResource = require('./../../resources/v1/userRoles/user_roles.resources')
const _UserRoles = new UserRolesResource();
module.exports = class AuthorizationMiddleware { 

    
    async auth(req,res,next){
        console.log('AuthorizationMiddleware@authDealer');

        if (!req.headers['authorization']) {
            return response.unauthorized('missing api token', res, false);
        }

        let token = req.headers['authorization'];
        
        try{
            
            jwt.verify(token, process.env.JWT_TOKEN_KEY, async(err, decoded) => {
                if (err) {
                  return response.unauthorized(err.message,res,false)
                }

                let user = await _User.getOne(decoded.user_id)
                let dealerRoleId = await _Role.findBySlug('customer');

                let isDealerCheck = await _UserRoles.findUserRoles(decoded.user_id);
                let roleArray = [];
                for(let dealer of isDealerCheck){
                    roleArray.push(dealer.role_id)
                }
                
                if(!_.includes(roleArray,dealerRoleId.id)){
                    return response.unauthorized('Please login with customer account.', res, false);
                }

                req.user = user

                next()
            });
        }
        catch (error) {
            return response.unauthorized(error.message, res, false);
        }
    }

    async authDealer(req,res,next){
        console.log('AuthorizationMiddleware@authDealer');

        if (!req.headers['authorization']) {
            return response.unauthorized('missing api token', res, false);
        }

        let token = req.headers['authorization'];
        
        try{
            
            jwt.verify(token, process.env.JWT_TOKEN_KEY, async(err, decoded) => {
                if (err) {
                  return response.unauthorized(err.message,res,false)
                }

                let user = await _User.getOne(decoded.user_id)
                let dealerRoleId = await _Role.findBySlug('dealer');

                let isDealerCheck = await _UserRoles.findUserRoles(decoded.user_id);
                let roleArray = [];
                for(let dealer of isDealerCheck){
                    roleArray.push(dealer.role_id)
                }
                
                if(!_.includes(roleArray,dealerRoleId.id)){
                    return response.unauthorized('Please login with fuel station account.', res, false);
                }

                req.user = user

                next()
            });
        }
        catch (error) {
            return response.unauthorized(error.message, res, false);
        }
    }
    async authStaff(req,res,next){
        console.log('AuthorizationMiddleware@authDealer');

        if (!req.headers['authorization']) {
            return response.unauthorized('missing api token', res, false);
        }

        let token = req.headers['authorization'];
        
        try{
            
            jwt.verify(token, process.env.JWT_TOKEN_KEY, async(err, decoded) => {
                if (err) {
                  return response.unauthorized(err.message,res,false)
                }

                let user = await _User.getOne(decoded.user_id)
                let dealerRoleId = await _Role.findBySlug('dealer');

                let isDealerCheck = await _UserRoles.findUserRoles(decoded.user_id);
                let roleArray = [];
                for(let dealer of isDealerCheck){
                    roleArray.push(dealer.role_id)
                }
                
                if(!_.includes(roleArray,dealerRoleId.id)){
                    return response.unauthorized('Please login with fuel station account.', res, false);
                }

                req.user = user

                next()
            });
        }
        catch (error) {
            return response.unauthorized(error.message, res, false);
        }
    }

}