const BaseController = require('./base');

class TagsController extends BaseController {
  constructor(TagModel) {
    super(TagModel);
  }
}

module.exports = TagsController;
