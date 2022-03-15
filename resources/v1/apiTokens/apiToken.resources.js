'use strict';
const Op = require('sequelize').Op;
const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const ApiToken = require('./apiToken.model');


module.exports = class ApiTokenResource {
    
    async createOne(data = null) {
    
        console.log('ApiTokenResource@createOne');
        if (!data || data === '') {
            throw new Error('data is required');
        }
        
        let apiToken = await ApiToken.create(data);

        if (!apiToken) {
            return false;
        }

        return apiToken;
    }

    async getFcmToken(userId = null){
        console.log("ApiTokenResource@getFcmToken")

        if(!userId || userId === null || userId === ''){
            throw new Error("userId is required")
        }

        let apiToken = await ApiToken.findOne({
            where: {
                user_id: userId,
                fcm_token: {[Op.ne] : null}
            },
            order:[
                ['id', 'DESC']
            ],
            attributes: ['fcm_token'],
            limit: 1,
            logging: console.log
        })

        if(!apiToken){
            return false;
        }

        return apiToken;
    }

    async deleteFcmToken(userId){
        console.log("ApiTokenResource@deleteFcmToken")
        return await ApiToken.update({ fcm_token : null }, {
            where: {
                user_id : userId
            }
        });
    }

}