const _ = require('lodash');

const ResponseHelper = require('../../../helpers/v1/response.helpers');
const response = new ResponseHelper();

const DataHelper = require('../../../helpers/v1/data.helpers')
const _DataHelper = new DataHelper()

const BookingsResource = require('./bookings.resources');
const _Booking = new BookingsResource();

 
const UserRolesResource = require('../userRoles/user_roles.resources');
const _UserRole = new UserRolesResource()

const UserProfileResource = require('../userProfile/user_profiles.resources')
const _UserProfile = new UserProfileResource()
 
const ApiTokenResource = require('../apiTokens/apiToken.resources');
const _ApiToken = new ApiTokenResource()

 
const RolesResource = require('../roles/roles.resources')
const _Roles = new RolesResource()
 
module.exports = class BookingsController {
    
    async createOne(req,res){
        console.log('BookingsController@createOne');
        
        console.log({
            'user_id':req.user.id,
            'station_id':req.body.station_id,
            'booking_date':req.body.booking_date,
            'is_active':"1"
        });
        let booking = await _Booking.createOne({
            'user_id':req.user.id,
            'station_id':req.body.station_id,
            'booking_date':req.body.booking_date,
            'is_active':"1"
        });

        for (let element of req.body.booking_details) {
          
            let detail = {
                booking_id: booking.id,
                user_id: req.user.id,
                is_active: '1',
                vehicle_fuel_type: element.vehicle_fuel_type,
                vehicle_name: element.vehicle_name
            }
            let booked = await _Booking.storeBookingDetails(detail);
        }



        return response.created('booking created successfully', res);
    }
 
      
    
    async getAll(req, res) {
        console.log('BookingController@getALL');
        let bookings = await _Booking.getAllbookings(req.user.id);
        return response.success('successfully found user', res, bookings);
    }

    


    async updateOne(req, res) {
        console.log('BookingController @updateOne');
 
        let data = _.pick(req.body, ['booking_id']) 
        // data.staff_id=req.user.id;
        let isUpdate = await _Booking.updateOne(req.body.booking_id,{"staff_id":req.user.id});
       
        
        if (!isUpdate) {
            return response.exception('error updating booking', res, false);
        }
         
        return response.success('successfully updated booking',res );
    }
    
}   