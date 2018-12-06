/*
routeConfig = {
  routes: {id: '/api/candidate/', all: '/api/candidate/:id'},
  getAll: false|true,
  post: false|true,
  get: false|true,
  put: false|true
  remove: false|true
}
*/
class BaseRestAPI {
    constructor(config, app, routeConfig) {
        this.config = config;
        this.app = app;
        this.routeConfig = routeConfig;
    }

    configure() {
        let routeConfig = this.routeConfig;

        if (!routeConfig.controller)
            return;

        if (routeConfig.routes.all) {
            let allRoute = this.app.route(routeConfig.routes.all);
            routeConfig.getAll && allRoute.get(this.getAll.bind(this));
            routeConfig.post && allRoute.post(this.post.bind(this));
        }

        if (routeConfig.routes.id) {
            let idRoute = this.app.route(routeConfig.routes.id);
            if (routeConfig.get) idRoute.get(this.get.bind(this));
            if (routeConfig.put) idRoute.put(this.put.bind(this));
            if (routeConfig.remove) idRoute.delete(this.remove.bind(this));
        }
    }

    getAll(req, res) {
        let logger = this.config.logger;
        let controller = this.routeConfig.controller;
        let queryObj = controller.parseQuery(req.query);
        controller.query(queryObj.query, queryObj.limit, queryObj.skip)
            .then((d)=>{
                res.json(d);
            }, (e) => {
                logger.error(e);
                res.status(500);
            });
    }

    post (req, res) {
        let controller = this.routeConfig.controller;
        let logger = this.config.logger;
        controller.create(req.body)
            .then(
                (d) => res.json(d),
                (e) => {
                    logger.error(e);
                    res.status(500).end();
                }
            );
    }

    put(req, res) {
    //TODO: Validate param id and req.body
        let logger = this.config.logger;
        let controller = this.routeConfig.controller;
        controller.updateById(req.params.id, req.body)
            .then((data) => {
                res.json(data);
            }, (e) => {
                logger.error(e);
                if (e === 'NOT_FOUND') res.status(404).end();
                else res.status(500).end();
            });
    }

    get(req, res) {
        let logger = this.config.logger;
        let controller = this.routeConfig.controller;
        let options = {
            populate: req.query.$populate ? (req.query.$populate === 'true') : false
        };
        controller.readById(req.params.id, options)
            .then((data) => {
                if (!data) {
                    res.status(404).end();
                } else {
                    res.json(data);
                }
            }, (e) => {
                logger.error(e);
                res.status(500).end();
            });
    }

    remove(req, res) {
    //TODO: Validate param id
        let logger = this.config.logger;
        let controller = this.routeConfig.controller;
        controller.removeById(req.params.id)
            .then((d) => res.json(d), (e) => {
                logger.error(e);
                if (e === 'NOT_FOUND') res.status(404).end();
                else res.status(500).end();
            });
    }
}


module.exports = BaseRestAPI;
