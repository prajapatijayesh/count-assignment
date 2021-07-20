const Joi = require('joi');

const fetchSchema = Joi.object().keys({
    minCount: Joi.number().integer().required(),
    maxCount: Joi.number().integer().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
});

module.exports = {
    '/': fetchSchema
};
