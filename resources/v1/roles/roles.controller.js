const _ = require('lodash');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const DataHelper = require('../../../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

const RolesResource = require('./roles.resources');
const _Role = new RolesResource();

module.exports = class RolesController {
    async createOne(req,res){
        
        console.log('RolesController@createOne');
        let data = _.pick(req.body,['name','description','slug'])
        data.is_active = true;         
        let role = await _Role.createOne(data);

        if (!role) {
            return response.exception('role not created successfully', res, false);
        }

        return response.created('role created successfully', res, role);
    }

    async getAll(req,res){
        console.log('RolesController@getAll')
        let roles = await _Role.getAll(req.body.page, req.body.limit);

        if (!roles) {
            return response.notFound('no roles found', res, false);
        }

        return response.success('roles found', res, roles);
    }
    
}   