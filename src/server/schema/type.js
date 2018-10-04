const BaseSchema = require('./base');

module.exports = function() {
  const TypeSchema = new BaseSchema ({
    type       : {type: String, required: true, index: true},
    value      : {type: String, required: true}
  });

  return TypeSchema;
};
