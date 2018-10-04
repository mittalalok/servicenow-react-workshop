const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class BaseSchema extends Schema {
  constructor(opts){
    opts.created_at = {type: Date, default: Date.now};
    opts.updated_at = {type: Date, default: Date.now};
    // opts.active = {type: Boolean, default: true},
    super(opts);
  }
}

module.exports = BaseSchema;
