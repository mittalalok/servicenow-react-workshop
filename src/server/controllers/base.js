const MAX_LIMIT = 100;
const SchemaTypes = require('mongoose').Schema.Types;
const ObjectId = require('mongoose').Types.ObjectId;

class BaseController {
    constructor(Model) {
        this.Model = Model;
        this._fieldsToPopulate = [];
    }

    clear() {
        return this.Model.deleteMany({});
    }

    populate(data) {
        return this.Model.insertMany(data);
    }

    read(query = {}, options = null) {
        let qry = this.Model.find(query);
        return qry;
    }

    readById(id, options) {
        let qry = this.Model.findById(id);
        if (options && options.populate) {
            this._fieldsToPopulate.forEach((f) => {
                qry.populate({ path: f });
            });
        }
        return qry;
    }

    updateById(id, body) {
        return new Promise((resolve, reject) => {
            this.Model.findById(id).then(
                (model) => {
                    if (!model) {
                        reject('NOT_FOUND');
                        return;
                    }
                    body.updated_at = Date.now();
                    model.updateOne(body).then((d)=>{
                        if (d.nModified === 0) reject('NOT_FOUND');
                        else resolve({ _id: model._id });
                    },
                    (e)=>reject(e));
                },
                (e) => reject(e)
            );
        });
    }

    removeById(id) {
        return new Promise((resolve, reject) => {
            this.Model.findById(id).then(
                (model) => {
                    if (model) {
                        model.remove().then(resolve, reject);
                    } else reject('NOT_FOUND');
                },
                reject
            );
        });
    }

    create(body) {
        var m = new this.Model(body);
        return m.save();
    }

    query(query, limit=MAX_LIMIT, skip=0, options = null) {
        let qd = this.Model.find().merge(query);
        if (options && options.populate) {
          this._fieldsToPopulate.forEach((f) => {
            qd.populate({ path: f });
          });
        }
        let qc = this.Model.find().merge(query);

        return new Promise((resolve, reject) => {
            qc.countDocuments((err, count) => {
                if(err) {
                    reject(err);
                    return;
                }
                qd.limit(limit).skip(skip).exec((err, data) => {
                    if(err) {
                        reject(err);
                        return;
                    }
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

    addQueryForObjectIdField(key, value, query) {
      let obj = {};
      obj[key] = new ObjectId(value);
      query.where(obj);
    }

    addQueryForStringField(key, value, query) {
        query.regex(key, new RegExp(value, 'i'));
    }

    addQueryForNumberField(key, value, query) {
        let obj = {};
        const logger = global.logger;

        function tryToAddValue(key, value, operation='eq') {
            try {
                let number = parseInt(value, 10);
                switch(operation) {
                case 'eq':
                    obj[key] = number;
                    query.where(obj);
                    break;
                case 'ne':
                    query.ne(key, number);
                    break;
                case 'lte':
                    query.lte(key, number);
                    break;
                case 'lt':
                    query.lt(key, number);
                    break;
                case 'gte':
                    query.gte(key, number);
                    break;
                case 'gt':
                    query.gt(key, number);
                    break;
                }
            } catch(e) {
                logger.error(e);
                logger.error('Cast failed for key: %s and value: %s', key, value);
            }
        }

        if (value.indexOf('$') === 0) {
            if (value.indexOf('$gte') === 0) {
                tryToAddValue(key, value.substring(4), 'gte');
            } else if (value.indexOf('$gt') === 0) {
                tryToAddValue(key, value.substring(3), 'gt');
            } else if (value.indexOf('$lte') === 0) {
                tryToAddValue(key, value.substring(4), 'lte');
            } else if (value.indexOf('$lt') === 0) {
                tryToAddValue(key, value.substring(3), 'lt');
            } else if (value.indexOf('$ne') === 0) {
                tryToAddValue(key, value.substring(4), 'ne');
            } else if (value.indexOf('$eq') === 0) {
                tryToAddValue(key, value.substring(3), 'eq');
            } else {
                logger.warn('Could not determine operation for: %s', value);
            }
        } else {
            tryToAddValue(key, value);
        }
    }

    parseOtherParams(query, params) {
        let schema = this.Model.schema;
        const logger = global.logger;
        const self = this;
        let otherParams = Object.keys(params).filter((d) => d.indexOf('$') !== 0);
        logger.info('Parsing other params....');
        logger.info(otherParams);

        function parseValue(key, value) {
            logger.info('key: %s, value: %s', key, value);
            let type = schema.path(key);
            if (type) {
                if (type instanceof SchemaTypes.ObjectId) {
                  self.addQueryForObjectIdField(key, value, query);
                }
                else if(type instanceof SchemaTypes.String) {
                    self.addQueryForStringField(key, value, query);
                } if(type instanceof SchemaTypes.Number) {
                    self.addQueryForNumberField(key, value, query);
                } else if(typeof(type) === 'object') {
                    if (type.instance === 'String') {
                        self.addQueryForStringField(key, value, query);
                    } else if (type.instance === 'Array') {
                        let obj = {};
                        obj[key] = { $in: value.split(' ') };
                        query.where(obj);
                    }
                } else {
                    logger.warn('Ignoring key: %s, no handler for the particular type', key);
                }
            } else {
                logger.warn('Ignoring key: %s, which was not found in schema', key);
            }
        }

        for(let key of otherParams) {
            let value = params[key];
            if (typeof(value) === 'string') {
                parseValue(key, value);
            } else if (value instanceof Array) {
                value.map((v) => parseValue(key, v));
            }
        }
    }

    parseQuery(params, parseOtherParams = true) {

        let limit = MAX_LIMIT;
        let skip = 0;
        let sort = '';
        const logger = global.logger;
        let query = this.Model.find();

        try {
            limit = (params && params.$limit) ? parseInt(params.$limit, 10) : MAX_LIMIT;
            skip = (params && params.$skip) ? parseInt(params.$skip, 10) : 0;
            sort = (params && params.$sort) ? params.$sort : '';
        } catch(e) {
            //donothing
        }
        if (limit > MAX_LIMIT) limit = MAX_LIMIT;
        if (skip < 0) skip = 0;

        logger.info('Sort By Fields: %s', sort);
        parseOtherParams && this.parseOtherParams(query, params);
        query.sort(sort);
        return {
            query: query,
            limit: limit,
            skip: skip
        };
    }

}


module.exports = BaseController;
