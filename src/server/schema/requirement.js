const BaseSchema = require('./base');
const mongoose = require('mongoose');

module.exports = function(config) {
    const RequirementSchema = new BaseSchema({
        skills             : [{
            type: String, lowercase: true
        }],
        description        : {
            type: String, maxlength:250
        },
        details            : {
            type:String, maxlength: 4096
        },
        min_experience     : {
            type: Number
        },
        max_experience     : {
            type: Number,
        },
        business_unit      : {
            type: String, required: true, enum: config.types.business_type
        },
        manager            : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interviewer' // TODO: define &  require Interviewer Schema
        },
        hr_contact         : {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Interviewer' // TODO: define &  require Interviewer Schema
        },
        vacancies          : {
            type: Number, required: true, min:1
        },
    });
    return RequirementSchema;
};
