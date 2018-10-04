const TypeController  = require('../controllers/types');
const BaseRestAPI = require('./base');
const routes = {
  all: '/api/types'
};

class TypesAPI extends BaseRestAPI {
  constructor(config, app) {
    let routeConfig = {
      controller: new TypeController(config.models.type),
      routes: routes,
      getAll: true,
      get: false,
      put: false,
      post: false,
      remove: false
    };
    super(config, app, routeConfig);
    this.configure();
  }
}

module.exports = TypesAPI;
