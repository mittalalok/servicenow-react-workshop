const mongoose = require('mongoose');
const BaseSchema = require('./base');
const Schema = mongoose.Schema;


module.exports = function(config) {

    const InterviewerSchema = new BaseSchema ({
        name                : { type: String, required: true, minlength: 5, maxlength: 255, index: true },
        mobile              : { type: String, maxlength: 20, required: true, index: true },
        alternate_phone     : { type: String, maxlength: 20 },
        email               : { type: String, maxlength: 255, required: true, index: true, unique: true,
            validate: {
                validator: function(v) {
                    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return emailRegex.test(v);
                },
                message: props => `${props.value} is not a valid email`
            },
        },
        dob                 : { type: Date, required: true },
        level		            : { type: String, maxlength: 50 },
        department          : { type: String, maxlength: 50, required: true, index: true, enum: config.types.category_type },//TODO check enum
        business_unit       : { type: String, maxlength: 50, required: true, index: true, enum: config.types.business_type },//TODO check enum
        expertise           : [{ type: String, lowercase: true }]

    });
    return InterviewerSchema;
};
