const BaseController = require('./base');

class TypeController extends BaseController {
  constructor(TypeModel) {
    super(TypeModel);
  }

  // parseQuery(params) {
  //   const queryObj = super.parseQuery(params);
  //   let qryParams = {};
  //   if(params.type) {
  //     qryParams.type = params.type;
  //   }
  //   if(params.value) {
  //     qryParams.value = params.value;
  //   }
  //   queryObj.query = this.Model.find(qryParams);
  //   return queryObj;
  // }
}

module.exports = TypeController;
