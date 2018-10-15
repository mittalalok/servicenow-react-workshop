const BaseController = require('./base');

class InterviewRoundsController extends BaseController {
  constructor(requirementsModel) {
    super(requirementsModel);
    this._fieldsToPopulate = ['selection', 'interviewer'];
  }
}

module.exports = InterviewRoundsController;
