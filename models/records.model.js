/** 
 * @author             : prajapatijayesh
 * @Date               : 2021-07-20
 * @Last Modified by   : 
 * @Last Modified time : 
 * @description        : Model: Record 
 * 
*/

const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    key: String,
    createdAt: Date,
    counts: [Number],
    value: String
});

module.exports = mongoose.model('Record', RecordSchema);