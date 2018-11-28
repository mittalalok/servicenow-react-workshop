const InterviewerController  = require('../controllers/interviewers');
const BaseRestAPI = require('./base');
const routes = {
    all: '/api/interviewers',
    id: '/api/interviewers/:id'
};

class InterviewerAPI extends BaseRestAPI {
    constructor(config, app) {
        let routeConfig = {
            controller: new InterviewerController(config.models.interviewer),
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

module.exports = InterviewerAPI;
