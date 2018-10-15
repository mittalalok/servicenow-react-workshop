const BaseController = require('./base');

class requirementsController extends BaseController {
  constructor(requirementsModel) {
    super(requirementsModel);
    this._fieldsToPopulate = ['manager', 'hr_contact'];
  }
}

module.exports = requirementsController;
