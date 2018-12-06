const RequirementController = require('../controllers/requirements');
const BaseRestAPI = require('./base');
const routes = {
    all: '/api/requirements',
    id:'/api/requirements/:id'
};

class RequirementAPI extends BaseRestAPI {
    constructor(config, app) {
        let routeConfig = {
            controller: new RequirementController(config.models.requirement),
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

module.exports = RequirementAPI;
