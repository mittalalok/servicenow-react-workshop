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

let mockDataForCollectionWithRef = (interviewerCollection, candidateCollection) => {
  interviewerCollection.get().then((d)=>{
    let dataSize = d.data && d.data.length;
    const RequirementsController = require('../controllers/requirements');
    const RequirementsCollection = new Collection(new RequirementsController(config.models.requirement), logger);
    let mockRequirementsData = require('../mockData/requirements.json');
    let newdata = mockRequirementsData.map((item)=> {
      let randomNumber = Math.floor(Math.random() * Math.floor(dataSize));
      let id = d.data[randomNumber] && d.data[randomNumber]._id;
      item.manager = id;
      item.hr_contact = id;
      return item;
    });
    
    initializeCollection(RequirementsCollection, logger, newdata).then(()=>{
      let candiateIds = [], requirementIds = [];
      let candidatePromise = new Promise((resolve, reject)=>{
        candidateCollection.get().then((d)=>{
          candiateIds = d.data && d.data.map(item=>item._id);
          resolve();
        }, (err)=>{
          reject(err);
        });
      });
      
      let RequirementsPromise = new Promise((resolve, reject)=>{
        RequirementsCollection.get().then((d)=>{
          requirementIds = d.data && d.data.map(item=>item._id);
          resolve();
        }, (err)=>{
          reject(err);
        });
      });

      Promise.all([candidatePromise, RequirementsPromise])
        .then(()=>{
          let candiateIdsSize = candiateIds.length;
          let requirementIdSize = requirementIds.length;
          let getRandom = (seed) => {
            return Math.floor(Math.random() * Math.floor(seed));
          };
          const SelectionController = require('../controllers/selections');
          const SelectionCollection = new Collection(new SelectionController(config.models.selection), logger);
          const mockSelectionData = require('../mockData/selections.json');
          let newdata = mockSelectionData.map((item)=> {
            item.requirement = requirementIds[getRandom(requirementIdSize)];
            item.candidate = candiateIds[getRandom(candiateIdsSize)];
            return item;
          });
          initializeCollection(SelectionCollection, logger, newdata).then(()=>{
            logger.info('Successfully completed all operations... exitting.');
            process.exit(0);
          }, ()=>{
            logger.error('Sorry, some errors occured... exitting.');
            process.exit(1);
          });
        });
    });
  });
};

function run(config) {
    
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
    
  
    
  Promise.all(promises)
    .then(()=>{
      //Slection and Requirements collections has depency on Interview and Candiate
      mockDataForCollectionWithRef(interviewerCollection, candidateCollection);
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
