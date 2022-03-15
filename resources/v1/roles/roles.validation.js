const _ = require('lodash');
const Joi = require('joi');
const DataHelpers = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelpers();

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const RolesResource = require('./roles.resources');
const _Role = new RolesResource();


module.exports = class RolesValidation {
    async createOne(req, res, next) {
        console.log('RolesValidation@createOne');
        
        let schema = {
            name: Joi.string().required(),
            description: Joi.string().optional()
        }

        let errors = await _DataHelper.joiValidation(req.body, schema);

        if(errors) {
            return response.badRequest('invalid request data', res, errors);
        }


        const slug = await _DataHelper.generateSlug(req.body.name, '-')

        //check if a role already exists in database
        let role = await _Role.findBySlug(slug);
        if(role) {
            return response.conflict('a role with this name is already exists', res, false);
        };

        req.body.slug = slug

        next();
    }

    async getAll(req, res, next) {
        console.log('RolesValidation@getAll');
        // verify page and size - set default if not provided
        let paginateData = await _DataHelper.getPageAndLimit(req.query);
        req.body.page = paginateData.page;
        req.body.limit = paginateData.limit;
        
        next();
    }

}