const mongoose = require('mongoose');
const candidateSchemaCreator = require('./schema/candidate');
const requirementSchemaCreator = require('./schema/requirement');
const tagSchemaCreator = require('./schema/tag');
const interviewerSchemaCreator = require('./schema/interviewer');
const selectionsSchemaCreator = require('./schema/selection');

module.exports = function(config) {
  let models = config.models;

  const CandidateSchema = candidateSchemaCreator(config);
  models.candidate = mongoose.model('Candidate', CandidateSchema);
  const TagSchema = tagSchemaCreator(config);
  models.tag = mongoose.model('Tag', TagSchema);
  const InterviewerSchema = interviewerSchemaCreator(config);
  models.interviewer = mongoose.model('Interviewer', InterviewerSchema);
  models.requirement = mongoose.model('Requirement', requirementSchemaCreator(config));
  models.selection = mongoose.model('Selection', selectionsSchemaCreator(config));
};
