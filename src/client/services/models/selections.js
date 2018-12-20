
import BaseModel from './base';

export default class EventService extends BaseModel{
  constructor() {
    super('selections');
  }
  getAllForEvent(id) {
    return this.get(this.baseUrl + '?requirement=' + id + '&$populate=true');
  }
}
