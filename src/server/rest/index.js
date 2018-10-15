const CandidateApi = require('./candidates');
const TypesApi = require('./types');
const TagsAPI = require('./tags');
const InterviewerAPI = require('./interviewers');
const RequirementsAPI = require('./requirements');
const SelectionsAPI = require('./selections');

const bodyParser = require('body-parser');

function init(config, app) {
  app.use(bodyParser.json());
  new CandidateApi(config, app);
  new TypesApi(config, app);
  new TagsAPI(config, app);
  new InterviewerAPI(config, app);
  new RequirementsAPI(config, app);
  new SelectionsAPI(config, app);
}



module.exports = init;
