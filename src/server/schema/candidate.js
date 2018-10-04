const mongoose = require('mongoose');
const BaseSchema = require('./base');
const Schema = mongoose.Schema;


module.exports = function(config) {

  const CandidateSchema = new BaseSchema ({
    name                : {type: String, required: true, minlength: 5, maxlength: 255, index: true},
    street_address      : {type: String, maxlength: 255},
    city                : {type: String, maxlength: 100},
    state               : {type: String, maxlength: 100},
    country             : {type: String, maxlength: 100},
    pin                 : {type: String, maxlength: 20},
    mobile              : {type: String, maxlength: 20, required: true, index: true},
    alternate_phone     : {type: String, maxlength: 20},

    email               : {type: String, maxlength: 255, required: true, index: true, unique: true,
      validate: {
        validator: function(v) {
          const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return emailRegex.test(v);
        },
        message: props => `${props.value} is not a valid email`
      },
    },

    dob                 : {type: Date, required: true},
    current_role        : {type: String, maxlength: 50},
    category            : {type: String, maxlength: 50, required: true, index: true, enum: config.types.category_type },//TODO check enum
    experience          : {type: Number, required: true, index: true},
    qualification       : {type: String, maxlength: 50, required: true, index: true, enum: config.types.qualification_type},//TODO check enum
    additional_details  : {type: String, maxlength: 255},
    attachment          : {type: Schema.Types.ObjectId},
    current_employer    : {type: String, maxlength: 255},
    skills              : [String],
    gender              : {type: String, default: 'M', required:true, enum: ['M','F']},
    // internal           : {type: Boolean, default: false},
  });
  return CandidateSchema;
};
