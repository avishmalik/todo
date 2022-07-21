const Joi = require('joi');

module.exports.todoSchema = Joi.object({
    todo: Joi.object({
        body:Joi.string().required(),
        time: Joi.string().required(),
        
    }).required()
})
