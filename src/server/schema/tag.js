const BaseSchema = require('./base');

module.exports = function() {
    const TagSchema = new BaseSchema ({
        value       : { type: String, lowercase: true, required: true, index: true }
    });

    return TagSchema;
};
