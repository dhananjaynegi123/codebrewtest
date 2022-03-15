const _ = require('lodash');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const DataHelper = require('../../../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

const UsersResource = require('./users.resources');
const _User = new UsersResource();

 
const UserRolesResource = require('../userRoles/user_roles.resources');
const _UserRole = new UserRolesResource()

const UserProfileResource = require('../userProfile/user_profiles.resources')
const _UserProfile = new UserProfileResource()
 
const ApiTokenResource = require('../apiTokens/apiToken.resources');
const _ApiToken = new ApiTokenResource()

 
const RolesResource = require('../roles/roles.resources')
const _Roles = new RolesResource()
 
module.exports = class UsersController {
    
    async createOne(req,res){
        console.log('UsersController@createOne');
        let data = _.pick(req.body,['email','password','role_id','lat','lng'])
         
        let hashedPassword = await _DataHelper.hashPassword(data.password);
       
        data.password = hashedPassword;

        let user = await _User.createOne(data);

        let roleData = {
            user_id: user.id,
            role_id: data.role_id
        }


        // Assign user role while create new user
        await _UserRole.createOne(roleData);

        
                
        let token = await _DataHelper.generateToken({ user_id: user.id })

        await _ApiToken.createOne({
            token: token,
            fcm_token: req.headers['fcm-token'],
            user_id: user.id,
            device_id: req.headers['device-id'],
            user_agent: req.headers['user-agent'],
            is_active: 1
        })

        let userProfileBody = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            dob: req.body.dob,
            address: req.body.address,
            user_id: user.id
        }
        
        let userProfile = await _UserProfile.createOne(userProfileBody)

        if (!user) {
            return response.exception('user not created successfully', res, false);
        }

        return response.created('user created successfully', res, {
            id: user.id,
            email: user.email,
            name: user.name,
            token: token,
            is_active: user.is_active,
            user_roles: [{
                role_id : data.role_id 
            }]
        });
    }


    async createStaff(req,res){
        console.log('UsersController@createOne');
        let userDetails = req.user
        let data = _.pick(req.body,['email','password','role_id','lat','lng'])
         
        let hashedPassword = await _DataHelper.hashPassword(data.password);
       
        data.password = hashedPassword;

        let user = await _User.createOne(data);

        let roleData = {
            user_id: user.id,
            role_id: '3'
        }


        // Assign user role while create new user
        await _UserRole.createOne(roleData);

        
                
        let token = await _DataHelper.generateToken({ user_id: user.id })

        await _ApiToken.createOne({
            token: token,
            fcm_token: req.headers['fcm-token'],
            user_id: user.id,
            device_id: req.headers['device-id'],
            user_agent: req.headers['user-agent'],
            is_active: 1
        })

        let userProfileBody = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            dob: req.body.dob,
            address: req.body.address,
            user_id: user.id
        }
        
        let userProfile = await _UserProfile.createOne(userProfileBody)

        let staff = {
            user_id: user.id,
            dealer_id: userDetails.id
        }
        console.log(staff);
        let staffAddded = await _User.createStaff(staff)

        if (!user) {
            return response.exception('user not created successfully', res, false);
        }

        return response.created('user created successfully', res, {
            id: user.id,
            email: user.email,
            name: user.name,
            token: token,
            is_active: user.is_active,
            user_roles: [{
                role_id : data.role_id 
            }]
        });
    }
 
     
 
 

    async login(req,res){
        console.log("UsersController@login");
        let userDetails = req.user

        let token = await _DataHelper.generateToken({ user_id: userDetails.id })

        await _ApiToken.createOne({
            token: token,
            user_id: userDetails.id,
            fcm_token: req.headers['fcm_token'],
            device_id: req.headers['device-id'],
            user_agent: req.headers['user-agent'],
            is_active: 1
        })

        let userRoles = await _UserRole.findUserRoles(userDetails.id)

        return response.success('login successfully.',res, {
            id: userDetails.id,
            is_active: userDetails.is_active == 0 ? false : true,
            email: userDetails.email,
            name: userDetails.name,
            token: token,
            user_roles: userRoles
        })
    }

       
    
    async search(req, res) {
        console.log('UsersController@search');
        let nearby = await _User.getNearby(req.body.lat,req.body.long);

        if(!nearby) {
            return response.notFound('user not found', res, false);
        }

        return response.success('successfully found user', res, nearby);
    }

    async upload(req, res){
        console.log("bookingController@uploadIcon",req.file)
        
        if (req.file === undefined) {
            return response.badRequest('invalid request data. Please add file to request', res);   
        }

        let data = {
            profile_photo : req.file.path
        }

        return response.created('File uploaded successfully', res, data);
    }
    
}   