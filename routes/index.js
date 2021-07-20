/** 
 * @author             : prajapatijayesh
 * @Date               : 2021-07-20
 * @Last Modified by   : 
 * @Last Modified time : 
 * @description        : Router: index 
 * 
*/

const express = require('express');
const router = express.Router();

// joi config
const SchemaValidator = require('../lib/joiSchemas/SchemaValidator');
const Schemas = require('../lib/joiSchemas/v1/index');
const validateRequest = SchemaValidator(Schemas);

// controller
const ctrl = require('../controllers/index');

router.get('/', (req, res, next) => {
    return res.render('index', { title: 'getir' });
});

router.post('/', validateRequest, ctrl.fetch);

module.exports = router;
