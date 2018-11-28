const mongoose = require('mongoose');
const BaseSchema = require('./base');
const Schema = mongoose.Schema;

module.exports = function(config) {
    const InterviewRoundSchema = new BaseSchema ({
        selection: { type: Schema.Types.ObjectId, ref: 'Selection' },
        interviewer: { type: Schema.Types.ObjectId, ref: 'Interviewer' },
        status: { type: String, maxlength: 50, required: true, index: true, enum: config.types.selection_status },
        recommended: Boolean,
        feedback: { type: String, maxlength: 4096 },
        mode: { type: String, maxlength: 50, required: true, index: true, enum: config.types.interview_mode },
        location: { type: String, maxlength: 255 },
        scheduled_date: { type: Date, required: true },
        duration: Number
    });
    return InterviewRoundSchema;
};
