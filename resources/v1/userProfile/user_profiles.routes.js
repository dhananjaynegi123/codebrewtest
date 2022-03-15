const express = require('express');
const routes = express.Router();
const multer  = require('multer');
const path = require('path');

 

const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const UserProfilesValidation = require('./user_profiles.validation');
const validate = new UserProfilesValidation();

const UserProfilesController = require('./user_profiles.controller');
const userProfile = new UserProfilesController();
 

/**
 * routes
 */

routes.post('/',[auth.auth,validate.createOne],userProfile.createOne);  
module.exports = routes; 