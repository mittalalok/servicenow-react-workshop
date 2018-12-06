const CandidateController  = require('../controllers/candidates');
const BaseRestAPI = require('./base');
const routes = {
    all: '/api/candidates',
    id: '/api/candidates/:id'
};

class CandidateAPI extends BaseRestAPI {
    constructor(config, app) {
        let routeConfig = {
            controller: new CandidateController(config.models.candidate),
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

module.exports = CandidateAPI;
