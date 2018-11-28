const SelectionsController = require('../controllers/selections');
const BaseRestAPI = require('./base');
const routes = {
    all: '/api/selections',
    id:'/api/selections/:id'
};

class SelectionAPI extends BaseRestAPI {
    constructor(config, app) {
        let routeConfig = {
            controller: new SelectionsController(config.models.selection),
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

module.exports = SelectionAPI;
