import axios from 'axios';

export default class Service {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  getById(id, populate=true) {
    if(populate === false)
      return axios.get(`${this.baseUrl}/${id}`);
    else
      return axios.get(`${this.baseUrl}/${id}?$populate=true`);
  }

  put(id, data) {
    return axios.put(`${this.baseUrl}/${id}`, data);
  }

  post(data) {
    return axios.post(`${this.baseUrl}`, data);
  }

  delete(id) {
    return axios.delete(`${this.baseUrl}/${id}`);
  }

  getByUrl(url) {
    return axios.get(url);
  }

}
