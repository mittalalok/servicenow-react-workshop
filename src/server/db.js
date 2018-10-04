const mongoose = require('mongoose');
module.exports = (dbConfig) => {
  mongoose.connect(`mongodb://${dbConfig.url}/${dbConfig.name}`,
    dbConfig.options || {}
  );
};
