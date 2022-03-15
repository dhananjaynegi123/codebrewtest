'use strict';
const Op = require('sequelize').Op;
const DataHelper = require('../../../helpers/v1/data.helpers');
const _DataHelper = new DataHelper();

const Role = require('./role.model');


module.exports = class RolesResource {
    
    async createOne(data = null) {
    
        console.log('RolesResource@createOne');
        if (!data || data === '') {
            throw new Error('data is required');
        }
        
        let role = await Role.create(data);

        if (!role) {
            return false;
        }

        return role;
    }

    async findBySlug(slug) {
        console.log("RolesResource@findBySlug");
        if(!slug || slug === ''){
            throw new Error('slug is required');
        }

        let role = await Role.findOne({
            where: {
                slug : slug
            }
        })

        if(!role) {
            return false;
        }

        return role;
    }

    async getOne(id){
        console.log("RolesResource@getOne")
        if (!id || id === '') {
            throw new Error('id is required');
        }

        let role = Role.findOne({
            where: {
                id: id
            }
        })

        if(!role){
            return false;
        }

        return role;
    }

    async getAll(pageNo = null, limit = null) {
        console.log('RolesResource@getAll');
        // get a count of all the folders
        let totalRecords = await Role.count();

        let pagination = await _DataHelper.pagination(totalRecords, pageNo, limit);

        let results;

        try {
            results = await Role.findAll({
                offset: pagination.offset,
                limit: pagination.limit,
            });
        } catch (err) {
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }

        if (results.length < 1) {
            return false;
        }

        let resObj = {
            total: totalRecords,
            current_page: pagination.pageNo,
            total_pages: pagination.totalPages,
            per_page: pagination.limit,
            users: results
        }

        return resObj;
    }

}