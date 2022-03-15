const _ = require('lodash');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const DataHelper = require('../../../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

const UserRolesResource = require('./user_roles.resources');
const _UserRole = new UserRolesResource();

module.exports = class UserRolesController {
    async createOne(req,res){
        console.log('UserRolesResource@createOne');
        let data = _.pick(req.body,['user_id','role_id'])
        
        let user = await _UserRole.createOne(data);

        if (!user) {
            return response.exception('user role not created successfully', res, false);
        }

        return response.created('user role created successfully', res, user);
    }

   
    
}   