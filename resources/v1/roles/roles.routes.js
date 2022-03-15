const express = require('express');
const routes = express.Router();

 
const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const RolesValidation = require('./roles.validation');
const validate = new RolesValidation();

const RolesController = require('./roles.controller.js');
const role = new RolesController();

/**
 * routes
 */

routes.post('/',[validate.createOne],role.createOne)
routes.get('/',[validate.getAll],role.getAll)

module.exports = routes;