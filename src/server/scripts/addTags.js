
const bunyan = require('bunyan');
const defaultLogger = bunyan.createLogger({name: 'addTags'});
/*
// Example of usage
function addTagsToCandidates() {
  const tags = require('../mockData/category-tags.json');
  const candidates = require('../mockData/candidates.json');
  const categoryBasedTags = tags.categories;
  const tagFieldName = 'tags';
  addTags(categoryBasedTags, 'category', candidates, tagFieldName, 'skills');
}*/

function addTags(fieldNameWithTags, fieldName, records, tagFieldName = 'tags', recordFieldName='tags', logger = defaultLogger) {
  for(let cd of fieldNameWithTags) {
    let fieldValue = cd[fieldName];
    let tags = cd[tagFieldName];
    let recordsHavingFieldValue = records.filter((d) => d[fieldName] === fieldValue);
    logger.info('Found: %s records having %s value : %s', recordsHavingFieldValue.length, fieldName, fieldValue);
    logger.info('Tags to insert: %s', JSON.stringify(tags));
    recordsHavingFieldValue.forEach((c) => {
      let numTags = tags.length;
      let random = parseInt(Math.random() * Math.floor(numTags), 10);
      c[recordFieldName] = tags.slice(0, random);
    });
  }
}

module.exports = {
  addTags
};
