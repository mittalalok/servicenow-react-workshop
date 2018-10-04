const CandidateApi = require('./candidates');
const TypesApi = require('./types');
const bodyParser = require('body-parser');
function init(config, app) {
  app.use(bodyParser.json());
  new CandidateApi(config, app);
  new TypesApi(config, app);
}



module.exports = init;
