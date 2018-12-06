const BaseController = require('./base');

class SelectionsController extends BaseController {
    constructor(requirementsModel) {
        super(requirementsModel);
        this._fieldsToPopulate = ['requirement', 'candidate'];
    }
}

module.exports = SelectionsController;
