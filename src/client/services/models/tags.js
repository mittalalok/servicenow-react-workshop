
import BaseModel from './base';

export default class EventService extends BaseModel{
  constructor() {
    super('tags');
  }

  getForValue(val) {
    return this.get({ value: val });
  }

}
