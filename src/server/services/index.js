const mongoose = require('mongoose');
const TypesController = require('../controllers/types');
const typeSchemaCreator = require('../schema/type');

module.exports = function(config, typeModel) {
    config.models = config.models || {};
    const logger = config.logger;
    let TypeSchema = typeSchemaCreator();
    let TypeModel = typeModel || mongoose.model('type', TypeSchema);
    config.models.type = TypeModel;
    return new Promise((resolve, reject) => {
        logger.info('Initializing services....');
        const typesController = new TypesController(TypeModel);
        typesController.read({})
            .then((d)=>{
                logger.info('Completed reading types collection.');
                const types = {};
                d.map((x) => {
                    let value = x.value;
                    let type = x.type;
                    types[type] = types[type] || [];
                    types[type].push(value);
                });
                logger.info(types);
                config.types = types;
                resolve();
            }, (e) => {
                logger.error(e);
                reject(e);
            });
    });
};
