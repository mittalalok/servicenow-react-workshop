const BaseController = require('./base');

class InterviewerController extends BaseController {

    constructor(InterviewerModel) {
        super(InterviewerModel);
    }
}

module.exports = InterviewerController;
