import { SERVER_URL } from '../../constants';
import RestService from '../rest';

export default class BaseModel {
  constructor(modelName) {
    this.modelName = modelName;
    this.service = new RestService(`${SERVER_URL}${this.modelName}`);
  }

  getById(id) {
    return this.service.getById(id);
  }

  update(id, data) {
    return this.service.put(id, data);
  }

  create(data) {
    return this.service.post(data);
  }
}
