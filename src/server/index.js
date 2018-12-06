const config = require('./config.json');
const express = require('express');
const cors = require('cors');
const bunyan = require('bunyan');
const logger = bunyan.createLogger({ name: config.name });
config.logger = logger;
global.logger = logger;
const dbInit = require('./db');
const servicesInit = require('./services');
const restServiceInit = require('./rest');
const modelInit = require('./models');

const app = express();

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

app.use(express.static('dist'));

dbInit(config.database);
servicesInit(config).then(() => {
    modelInit(config);
    logger.info('Services were initialized succesfully');
    restServiceInit(config, app);
    app.listen(config.server.port, (e) => {
        if(e) {
            logger.error(e);
            process.exit(1);
        } else {
            logger.info('Server up and running at %s', config.server.port);
        }
    });
}, (e) => {
    logger.error(e);
    process.exit(1);
});
