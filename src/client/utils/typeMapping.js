let candidates = {
  name                : {index: true, required: true, minlength: 5, maxlength: 255, type: 'text', tag: 'input', name: 'Name'},
  street_address      : {maxlength: 255, type: 'text', tag: 'input', name: 'Street'},
  city                : {maxlength: 100 , type: 'text', tag: 'input', name: 'City'},
  state               : {maxlength: 100 , type: 'text', tag: 'input', name: 'State'},
  country             : {maxlength: 100 , type: 'text', tag: 'input', name: 'Country'},
  pin                 : {maxlength: 20 , type: 'text', tag: 'input', name: 'Pin'},
  mobile              : {index: true , maxlength: 20, required: true, type: 'tel', tag: 'input', name: 'Mobile' },
  alternate_phone     : {maxlength: 20, type: 'tel', tag: 'input', name: 'Alt Mobile'  },

  email               : {index: true, unique: true, maxlength: 255, required: true, type: 'email', tag: 'input', name: 'Email'},

  dob                 : {required: true, type: 'date', tag: 'input', name: 'Date of Birth'},
  current_role        : {maxlength: 50, type: 'text', tag: 'input', name: 'Current Role' },
  category            : {index: true , maxlength: 50, required: true, type: 'text', tag: 'input', name: 'Category' },//TODO check enum
  experience          : {index: true, required: true, type: 'number', tag: 'input', name: 'Experience'},
  qualification       : {index: true, maxlength: 50, required: true, type: 'text', tag: 'input', name: 'Qualification'},//TODO check enum
  additional_details  : {maxlength: 255, type: 'text', tag: 'input', name: 'Additional details'},
  attachment          : {type: 'file', tag: 'input', name: 'Attachment'},
  current_employer    : {maxlength: 255, type: 'text', tag: 'input', name: 'Current employer'},
  skills              : {type: 'text', tag: 'input', name: 'Skills'},
  gender              : {default: 'M', required:true, enum: ['M','F'], type: 'radio', tag: 'input', name: 'Gender'},
  // internal           : {type: Boolean, default: false},
};

let interviewers = {
  name                : {index: true, required: true, minlength: 5, maxlength: 255, type: 'text', tag: 'input', name: 'Name'},
  mobile              : {index: true, maxlength: 20, required: true, type: 'tel', tag: 'input', name: 'Mobile' },
  alternate_phone     : {maxlength: 20, type: 'tel', tag: 'input', name: 'Alt Mobile' },
  email               : {index: true, unique: true, maxlength: 255, required: true, type: 'email', tag: 'input', name: 'Email'},
  dob                 : {required: true, type: 'date', tag: 'input', name: 'Date of Birth'},
  level		            : {maxlength: 50, type: 'text', tag: 'input', name: 'Level'},
  department          : {index: true, enum: 'config.types.category_type' , maxlength: 50, required: true, type: 'text', tag: 'input', name: 'Department'},//TODO check enum
  business_unit       : {index: true, enum: 'config.types.business_type', maxlength: 50, required: true, type: 'text', tag: 'input', name: 'Business unit'},//TODO check enum
  expertise           : {lowercase: true, type: 'text', tag: 'input', name: 'Expertise'}

};

module.exports = {candidates, interviewers};
