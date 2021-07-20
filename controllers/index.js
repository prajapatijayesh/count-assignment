
/** 
 * @author             : prajapatijayesh
 * @Date               : 2021-07-20
 * @Last Modified by   : 
 * @Last Modified time : 
 * @description        : controller: index 
 * 
*/

const _ = require('lodash');
const Records = require('../models/records.model');

/**
 * fetch the records by applying date and max/min count criteria
 *  
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const fetch = async (req, res, next) => {
    const { minCount, maxCount, startDate, endDate } = req.body;

    try {
        const data = await Records.aggregate([{
            "$match": {
                "createdAt": {
                    "$gte": new Date(startDate),
                    "$lte": new Date(endDate)
                }
            }
        }, {
            "$project": {
                "_id": 0,
                "key": 1,
                "createdAt": 1,
                "totalCounts": {
                    "$sum": "$counts"
                }
            }
        }, {
            "$match": {
                "totalCounts": {
                    "$gte": minCount,
                    "$lte": maxCount
                }
            }
        }]);
        console.log('no. of records', _.size(data));
        return res.status(200).jsonp({
            code: 0,
            msg: 'Success',
            records: data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).jsonp({
            code: 2,
            msg: 'Sorry! Something went wrong.',
            records: []
        });
    }
}

module.exports = {
    fetch
}