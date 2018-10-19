const BaseController = require('./base');

class CandidateController extends BaseController {

  constructor(CandidateModel) {
    super(CandidateModel);
  }
}

module.exports = CandidateController;
