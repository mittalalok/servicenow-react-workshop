const mongoose = require('mongoose');
const BaseSchema = require('./base');
const Schema = mongoose.Schema;

module.exports = function(config) {
  const SelectionSchema = new BaseSchema ({
    requirement: {type: Schema.Types.ObjectId, ref: 'Requirement'},
    candidate: {type: Schema.Types.ObjectId, ref: 'Candidate'},
    status: {type: String, maxlength: 50, required: true, index: true, enum: config.types.selection_status },
    attachments: [{type: Schema.Types.ObjectId}],
    comments: {type: String, maxlength: 4096}
  });
  return SelectionSchema;
};
