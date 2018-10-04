const MAX_LIMIT = 100;

class BaseController {
  constructor(Model) {
    this.Model = Model;
  }

  clear() {
    return this.Model.deleteMany({});
  }

  populate(data) {
    return this.Model.insertMany(data);
  }

  read(query = {}) {
    return this.Model.find(query);
  }

  readById(id) {
    return this.Model.findById(id);
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
            else resolve({_id: model._id});
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

  query(query = this.Model.find(), limit=MAX_LIMIT, skip=0) {
    let qd = this.Model.find().merge(query);
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


  parseQuery(params) {
    let limit = MAX_LIMIT;
    let skip = 0;
    try {
      limit = (params && params.$limit) ? parseInt(params.$limit, 10) : MAX_LIMIT;
      skip = (params && params.$skip) ? parseInt(params.$skip, 10) : 0;
    } catch(e) {
      //donothing
    }
    if (limit > MAX_LIMIT) limit = MAX_LIMIT;
    if (skip < 0) skip = 0;
    return {
      query: this.Model.find(),
      limit: limit,
      skip: skip
    };
  }

}


module.exports = BaseController;
