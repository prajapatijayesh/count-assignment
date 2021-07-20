/** 
 * @author             : prajapatijayesh
 * @Date               : 2021-07-20
 * @Last Modified by   : 
 * @Last Modified time : 
 * @description        : common joi validator middleware module, 
 *                       accepts one argument and returns the schema validation middleware
 * 
*/

const _ = require('lodash');
const Joi = require('joi');

module.exports = (schema, opts) => {
    // schema object
    const SCHEMA = schema;
    // supported HTTP methods
    const _supportedMethods = ['post'];

    // joi validation options
    const _opts = {
        abortEarly: false, // abort after the last validation error
        allowUnknown: true, // allow unknown keys that will be ignored
        stripUnknown: true // remove unknown keys from the validated data
    };
    const _validationOptions = { ..._opts, ...opts };

    // return the validation middleware
    return (req, res, next) => {
        const route = req.route.path;
        const method = req.method.toLowerCase();

        if (_.includes(_supportedMethods, method) && _.has(SCHEMA, route)) {
            // get schema for the current route
            const _schema = _.get(SCHEMA, route);
            if (_schema) {
                // validate req.body using the schema and validation options
                const validation = _schema.validate(req.body);
                console.log(validation);
                const value = validation.value;
                console.log(value);

                const error = validation.error;
                if (error) {
                    // joi error
                    const _error = {
                        status: 'error',
                        error: {
                            original: error._object,
                            // fetch only message and type from each error
                            details: _.map(error.details, ({ message, type }) => ({
                                message: message.replace(/['"]/g, ''),
                                type
                            }))
                        }
                    };
                    // send back the JSON error response
                    return res.status(422).json(_error);
                } else {
                    // replace req.body with the data after Joi validation
                    req.body = value;
                    return next();
                }
            }
        }
        return next();
    };
};
