const express = require('express');
const routes = express.Router();


const Authorize = require('../../../middleware/v1/authorize');
const auth = new Authorize();

const BookingsValidation = require('./bookings.validation');
const validate = new BookingsValidation();

const BookingsController = require('./bookings.controller.js');
const booking = new BookingsController();

/**
 * routes
 */

routes.post('/',[auth.auth,validate.createOne],booking.createOne); 
routes.get('/',[auth.authDealer],booking.getAll);
routes.put('/',[auth.authStaff],booking.updateOne);

module.exports = routes;