
import { SERVER_URL } from '../../constants';
import axios from 'axios';


export default class EventService {
  constructor() {
    this.modelName = 'requirements';
    this.url = `${SERVER_URL}${this.modelName}`;
  }

  update(id, data) {
    return axios.put(`${this.url}/${id}`, data);
  }

  create(data) {
    return axios.post(`${this.url}`, data);
  }
}
