const express = require('express');
const routes = express.Router();

 

const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const UserRolesValidation = require('./user_roles.validation');
const validate = new UserRolesValidation();

const UserRolesController = require('./user_roles.controller.js');
const user = new UserRolesController();

/**
 * routes
 */

routes.post('/',[validate.createOne],user.createOne)

module.exports = routes;