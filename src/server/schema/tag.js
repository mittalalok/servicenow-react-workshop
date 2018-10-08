const BaseSchema = require('./base');

module.exports = function() {
  const TagSchema = new BaseSchema ({
    value       : {type: String, required: true, index: true}
  });

  return TagSchema;
};
