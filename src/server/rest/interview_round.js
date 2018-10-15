//interview_round.js
const InterviewRoundsController = require('../controllers/interview_rounds');
const BaseRestAPI = require('./base');
const routes = {
  all: '/api/interviewRounds',
  id:'/api/interviewRounds/:id'
};

class InterviewRoundAPI extends BaseRestAPI {
  constructor(config, app) {
    let routeConfig = {
      controller: new InterviewRoundsController(config.models.interviewRound),
      routes: routes,
      getAll: true,
      get: true,
      put: true,
      post: true,
      remove: true
    };
    super(config, app, routeConfig);
    this.configure();
  }
}

module.exports = InterviewRoundAPI;
