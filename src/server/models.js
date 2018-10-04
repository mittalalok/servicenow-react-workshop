const mongoose = require('mongoose');
const candidateSchemaCreator = require('./schema/candidate');

module.exports = function(config) {
  const CandidateSchema = candidateSchemaCreator(config);
  let models = config.models;
  models.candidate = mongoose.model('Candidate', CandidateSchema);
};
