'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../config/v1/mysql');
 
const UserModel = require('../resources/v1/users/user.model')
const RoleModel = require('../resources/v1/roles/role.model')   
const UserProfileModel = require('../resources/v1/userProfile/user_profile.model') 
const UserRoleModel = require('../resources/v1/userRoles/user_role.model')
const ApiTokenModel = require('../resources/v1/apiTokens/apiToken.model');
const DealerStaffModel = require('../resources/v1/users/dealer_staff.model');
const BookingModel = require('../resources/v1/bookings/booking.model');
const BookingDetailModel = require('../resources/v1/bookings/booking_detail.model');


const models = { 
    User: UserModel.init(sequelize, Sequelize),
    Role: RoleModel.init(sequelize, Sequelize),
    UserProfile: UserProfileModel.init(sequelize, Sequelize),
    UserRole: UserRoleModel.init(sequelize, Sequelize),
    ApiToken: ApiTokenModel.init(sequelize, Sequelize),
    DealerStaff: DealerStaffModel.init(sequelize, Sequelize),
    Booking: BookingModel.init(sequelize, Sequelize),
    BookingDetail: BookingDetailModel.init(sequelize, Sequelize),
}   

Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

const db = {
    models,
    sequelize,
}

module.exports = db;