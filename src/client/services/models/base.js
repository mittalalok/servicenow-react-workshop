import { SERVER_URL } from '../../constants';
import RestService from '../rest';

export default class BaseModel {
  constructor(modelName) {
    this.serverUrl = SERVER_URL;
    this.modelName = modelName;
    this.baseUrl = `${SERVER_URL}${this.modelName}`;
    this.service = new RestService(this.baseUrl);
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

  get(params) {
    if (typeof(params) === 'string') {
      return this.service.getByUrl(params);
    } else {
      let url = this.baseUrl + '?';
      let keys = Object.keys(params);
      keys.forEach((k, i) => {
        url += k + '=' + params[k];
        if(i < keys.length - 1) {
          url += '&';
        }
      });
      return this.service.getByUrl(url);
    }
  }
}
