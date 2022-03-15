const express = require('express');
const routes = express.Router();


const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const UsersValidation = require('./users.validation');
const validate = new UsersValidation();

const UsersController = require('./users.controller.js');
const user = new UsersController();

const UploadUtils = require('../../../utils/upload.utils');
const _upload = new UploadUtils('uploads')

/**
 * routes
 */

routes.post('/',[validate.createOne],user.createOne);
routes.post('/login/',[validate.login],user.login);
routes.post('/search/',[auth.auth,validate.search],user.search);
routes.post('/staff/create',[auth.authDealer,validate.createStaff],user.createStaff);
routes.post('/upload',[],_upload.uploadFile().single('icon'),user.upload)
module.exports = routes;