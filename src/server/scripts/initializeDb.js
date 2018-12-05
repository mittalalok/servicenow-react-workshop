const config = require('../config.json');
const mongoose = require('mongoose');
const bunyan = require('bunyan');
const logger = bunyan.createLogger({ name: config.name });
config.logger = logger;
const Collection = require('./collection');

function initializeCollection(collection, logger, mockData) {
    return new Promise(function(resolve, reject){
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
    
    let promises = [];
    const mockTagData = require('../mockData/category-tags.json');
    const TagsController = require('../controllers/tags');
    const tagsCollection = new Collection(new TagsController(config.models.tag), logger);
    promises.push(initializeCollection(tagsCollection, logger, mockTagData.allTags.map((t) => {return { value: t.toLowerCase() };})));

    const categoryTagsAdder = require('./addTags');
    const CandidateController = require('../controllers/candidates');
    const candidateCollection = new Collection(new CandidateController(config.models.candidate), logger);
    const mockCandidateData = require('../mockData/candidates.json');
    categoryTagsAdder.addTags(mockTagData.categories, 'category', mockCandidateData, 'tags', 'skills');
    promises.push(initializeCollection(candidateCollection, logger, mockCandidateData));

    const InterviewerController = require('../controllers/interviewers');
    const interviewerCollection = new Collection(new InterviewerController(config.models.interviewer), logger);
    const mockInterviewerData = require('../mockData/interviewers.json');
    categoryTagsAdder.addTags(mockTagData.categories, 'category', mockInterviewerData, 'tags', 'expertise');
    promises.push(initializeCollection(interviewerCollection, logger, mockInterviewerData));
    
    let mockRefData = (candidateCollection) => {
      interviewerCollection.get().then((d)=>{
      let dataSize = d.data.length;
      const RequirementsController = require('../controllers/requirements');
      const RequirementsCollection = new Collection(new RequirementsController(config.models.requirement), logger);
      let mockRequirementsData = require('../mockData/requirements.json');
      let newdata = mockRequirementsData.map((item)=> {
        let randomNumber = Math.floor(Math.random() * Math.floor(dataSize));
        let id = d.data[randomNumber] && d.data[randomNumber]._id;
        item.manager = id;
        item.hr_contact = id;
        return item;
      })
      Promise.all([initializeCollection(RequirementsCollection, logger, newdata)]).then(()=>{
        process.exit(0);
      });
      });
    };
    
    Promise.all(promises)
        .then(()=>{
            logger.info('Successfully completed all operations... exitting.');
            mockRefData(candidateCollection);
            //process.exit(0);
        }, handleError);

    function handleError(e) {
        logger.error(e);
        logger.error('Sorry, some errors occured... exitting.');
        process.exit(1);
    }

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
