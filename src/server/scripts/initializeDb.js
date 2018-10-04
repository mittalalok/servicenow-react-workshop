const config = require('../config.json');
const mongoose = require('mongoose');
const bunyan = require('bunyan');
const logger = bunyan.createLogger({name: config.name});
config.logger = logger;
const Collection = require('./collection');

function initializeCollection(collection, logger, mockData) {
  return new Promise((resolve, reject) => {
    logger.info('Initializing collection: %s ...', collection.collectionName);
    collection.initialize(mockData)
      .then(
        ()=> {
          logger.info('Collection %s is successfully initialized!', collection.collectionName);
          resolve();
        },
        (e) => {
          logger.error(e);
          reject(e);
        }
      );
  });
}


function populateTypes(TypeModel) {
  const TypeController = require('../controllers/types');
  const mockTypeData = require('../mockData/types.json');
  const typeCollection = new Collection(new TypeController(TypeModel), logger);
  return initializeCollection(typeCollection, logger, mockTypeData);
}

function run(config) {

  // candidateCollection.clear().then(()=>{
  //   logger.info('CLEARED');
  // }, (e) => {
  //   logger.error(e);
  //   process.exit(1);
  // });
  var promises = [];
  const CandidateController = require('../controllers/candidates');
  const candidateCollection = new Collection(new CandidateController(config.models.candidate), logger);
  const mockCandidateData = require('../mockData/candidates.json');

  promises.push(initializeCollection(candidateCollection, logger, mockCandidateData));
  Promise.all(promises).then(()=>{
    logger.info('Successfully completed all operations... exitting.');
    process.exit(0);
  }, (e) => {
    logger.error(e);
    logger.error('Sorry, some errors occured... exitting.');
    process.exit(1);
  });

}

const dbInit = require('../db');
dbInit(config.database);

const servicesInit = require('../services');
const modelInit = require('../models');
const typeSchemaCreator = require('../schema/type');
let TypeSchema = typeSchemaCreator();
let TypeModel = mongoose.model('type', TypeSchema);

populateTypes(TypeModel).then(()=>{
  servicesInit(config, TypeModel).then(
    ()=>{
      modelInit(config);
      run(config);
    });
}, (e) => {
  logger.error(e);
  process.exit(1);
});
