let candidates = {
  name                : {type: String, required: true, minlength: 5, maxlength: 255, index: true, html : { type: 'text', tag: 'input', name: 'Name'}},
  street_address      : {type: String, maxlength: 255,html : { type: 'text', tag: 'input', name: 'Street'}},
  city                : {type: String, maxlength: 100 , html : { type: 'text', tag: 'input', name: 'City'}},
  state               : {type: String, maxlength: 100 , html : { type: 'text', tag: 'input', name: 'State'}},
  country             : {type: String, maxlength: 100 , html : { type: 'text', tag: 'input', name: 'Country'}},
  pin                 : {type: String, maxlength: 20 , html : { type: 'text', tag: 'input', name: 'Pin'}},
  mobile              : {type: String, maxlength: 20, required: true, index: true , html : { type: 'tel', tag: 'input', name: 'Mobile' }},
  alternate_phone     : {type: String, maxlength: 20, html : { type: 'tel', tag: 'input', name: 'Alt Mobile' } },

  email               : {type: String, maxlength: 255, required: true, index: true, unique: true,
    validate: {
      validator: function(v) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(v);
      },
      message: props => `${props.value} is not a valid email`
    },
    html : { type: 'email', tag: 'input', name: 'Email'}
  },

  dob                 : {type: Date, required: true, html : { type: 'date', tag: 'input', name: 'Date of Birth'}},
  current_role        : {type: String, maxlength: 50, html : { type: 'text', tag: 'input', name: 'Current Role' }},
  category            : {type: String, maxlength: 50, required: true, index: true , html : { type: 'text', tag: 'input', name: 'Category' }},//TODO check enum
  experience          : {type: Number, required: true, index: true, html : { type: 'text', tag: 'input', name: 'Experience'}},
  qualification       : {type: String, maxlength: 50, required: true, index: true, html : { type: 'text', tag: 'input', name: 'Qualification'}},//TODO check enum
  additional_details  : {type: String, maxlength: 255, html : { type: 'text', tag: 'input', name: 'Additional details'}},
  attachment          : {type: 'Schema.Types.ObjectId', html : { type: 'text', tag: 'input', name: 'Attachment'}},
  current_employer    : {type: String, maxlength: 255, html : { type: 'text', tag: 'input', name: 'Current employer'}},
  skills              : {html : { type: 'text', tag: 'input', name: 'Skills'}},
  gender              : {type: String, default: 'M', required:true, enum: ['M','F'], html : { type: 'radio', tag: 'input', name: 'gender'}},
  // internal           : {type: Boolean, default: false},
};

let interviewers = {
  name                : {type: String, required: true, minlength: 5, maxlength: 255, index: true, html : { type: 'text', tag: 'input', name: 'Name'}},
  mobile              : {type: String, maxlength: 20, required: true, index: true, html : { type: 'tel', tag: 'input', name: 'Mobile' }},
  alternate_phone     : {type: String, maxlength: 20, html : { type: 'tel', tag: 'input', name: 'Alt Mobile' }},
  email               : {type: String, maxlength: 255, required: true, index: true, unique: true,
    validate: {
      validator: function(v) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(v);
      },
      message: props => `${props.value} is not a valid email`
    },
    html : { type: 'email', tag: 'input', name: 'Email'}
  },
  dob                 : {type: Date, required: true, html : { type: 'date', tag: 'input', name: 'Date of Birth'}},
  level		            : {type: String, maxlength: 50, html : { type: 'text', tag: 'input', name: 'Level'}},
  department          : {type: String, maxlength: 50, required: true, index: true, enum: 'config.types.category_type' , html : { type: 'text', tag: 'input', name: 'Department'} },//TODO check enum
  business_unit       : {type: String, maxlength: 50, required: true, index: true, enum: 'config.types.business_type', html : { type: 'text', tag: 'input', name: 'Business unit'} },//TODO check enum
  expertise           : {type: String, lowercase: true, html : { type: 'text', tag: 'input', name: 'Expertise'}}

};

module.exports = {candidates, interviewers};