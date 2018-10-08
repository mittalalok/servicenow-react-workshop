const BaseController = require('./base');

class CandidateController extends BaseController {

  constructor(CandidateModel) {
    super(CandidateModel);
  }

  static query(queryObj, limit, skip, logger) {
    return new Promise((resolve, reject)=> {
      logger.info(queryObj);
      let query = this.Model.find();
      let qCount = this.Model.find();
      for(let k in queryObj) {
        logger.info('%s -> %s', k, queryObj[k]);
        switch(k) {
        case 'f_name':
        case 'm_name':
        case 'l_name':
        case 'email':
        case 'city':
        case 'country':
        case 'state':
        case 'pin':
        case 'street_address':
        case 'phone':
          query.regex(k, new RegExp(queryObj[k], 'i'));
          qCount.regex(k, new RegExp(queryObj[k], 'i'));
          break;
        default:
          query.where(k).eq(queryObj[k]);
          qCount.where(k).eq(queryObj[k]);
        }
      }
      qCount.count((err, count) => {
        if (err) {
          logger.error(err);
          reject(err);
          return;
        }
        logger.info('count: %s', count);
        if (limit) query.limit(limit);
        if (skip) query.skip(skip);
        query.exec((err, colls) => {
          if (err) {
            logger.error(err);
            reject(err);
            return;
          }
          logger.info('SUCCESS');
          let data = colls.map((c) => c.toJSON());
          resolve({
            total: count,
            limit: limit,
            skip: skip,
            data: data
          });
        });
      });
    });
  }
}

module.exports = CandidateController;
