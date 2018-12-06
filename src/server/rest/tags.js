const TagsController  = require('../controllers/tags');
const BaseRestAPI = require('./base');
const routes = {
    all: '/api/tags',
    id: '/api/tags/:id'
};

class TagsAPI extends BaseRestAPI {
    constructor(config, app) {
        let routeConfig = {
            controller: new TagsController(config.models.tag),
            routes: routes,
            getAll: true,
            get: false,
            put: false,
            post: true,
            remove: true
        };
        super(config, app, routeConfig);
        this.configure();
    }
}

module.exports = TagsAPI;
