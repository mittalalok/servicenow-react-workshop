const mongoose = require('mongoose');
const candidateSchemaCreator = require('./schema/candidate');
const requirementSchemaCreator = require('./schema/requirements');
const tagSchemaCreator = require('./schema/tag');
const interviewerSchemaCreator = require('./schema/interviewer');

module.exports = function(config) {
  let models = config.models;

  const CandidateSchema = candidateSchemaCreator(config);
  models.candidate = mongoose.model('Candidate', CandidateSchema);
  const TagSchema = tagSchemaCreator(config);
  models.tag = mongoose.model('Tag', TagSchema);
  const InterviewerSchema = interviewerSchemaCreator(config);
  models.interviewer = mongoose.model('Interviewer', InterviewerSchema);
  models.requirements = mongoose.model('requirements', requirementSchemaCreator(config));
};
