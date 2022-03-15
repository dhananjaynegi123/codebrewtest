'use strict';
const Op = require('sequelize').Op;
const sequelize = require('sequelize')
const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const Booking = require('./booking.model');
const BookingDetail = require('./booking_detail.model');
const UserProfile = require('../userProfile/user_profile.model');
const User = require('../users/user.model');



const RolesResource = require('../roles/roles.resources')
const _Role = new RolesResource();

module.exports = class BookingsResource {
    
    async createOne(data = null) {
    
        console.log('UsersResource@createOne');
        if (!data || data === '') {
            throw new Error('data is required');
        }
        
        let booking = await Booking.create(data);

        if (!booking) {
            return false;
        }

        return booking;
    }

    async storeBookingDetails(data = null) {
    
        console.log('UsersResource@createOne');
        if (!data || data === '') {
            throw new Error('data is required');
        }
        
        let booking = await BookingDetail.create(data);

        if (!booking) {
            return false;
        }

        return booking;
    }
    async getByEmail(email) {
        console.log('UsersResource@getByEmail');
        let results;

        try {
            results = await Booking.findOne({
                where: {
                    email: email,
                },
                raw: true,
            });
        } catch (err) {
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

        if(!results) {
            return false;
        }

        return results;
    }

    async getOne(id){
        console.log(id)
        console.log("UsersResource@getOne")
        if (!id || id === '') {
            throw new Error('id is required');
        }

        let user = Booking.findOne({
            where: {
                id: id
            }
        })

        if(!user){
            return false;
        }

        return user;
    }
    async getAllbookings(user_id){
        console.log('user_id')
        console.log(user_id)
        let users = Booking.findAll({
            where:{station_id:user_id},
            attributes:['id','user_id','staff_id'],
            include: [
                {
                    association: 'booking_details',
                    attributes:['vehicle_fuel_type','vehicle_name']
                },
                {
                    association: 'user_profiles',
                    attributes:['id','firstname','lastname','gender']
                },
                {
                    association: 'staff_detail',
                    attributes:['id','email'],
                }
            ],
          limit: 1000
        });

        if(!users){
            return false;
        }

        return users;
    }


    async updateOne(id, data) {
        console.log("BookingResource @updateOne ")
      
        try {
           
            await Booking.update(data, {
                where: {
                    id: id
                }
            });
        } catch (err) {
            console.log(err)
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

        return true;
    }
}