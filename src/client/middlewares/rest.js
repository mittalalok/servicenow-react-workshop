import { SERVER_URL } from '../services/config';
import axios from 'axios';

const restMiddleWare = store => next => action => {
  switch(action.type) {
  case 'api-search'://TODO Change the name here it is not api-search probably role-search
    fetchDataForRoles(action.params).then(action.callBackHandler);
    break;
  case 'api-get-by-id':
    fetchDataById(action.params).then(action.callBackHandler);
    break;
  case 'generic-api-search':
    fetchData(action.params).then(action.callBackHandler);
    break;
  }
  next(action);
};

function getSchemaName(role) {
  switch(role.id) {
  case 'Candidate': return 'candidates';
  default: return 'interviewers';
  }
}

function fetch(url, dontProcess) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res=>{
      if (res.status === 200) {
        let result = res.data.data ? res.data.data : res.data;
        if (!dontProcess) {
          result = result.map((r) => {
            let v = { ...r };
            v.id = v._id;
            return v;
          });
        }
        resolve(result);
      } else {
        reject(res);
      }
    }, (e) => {
      reject(e);
    });
  });
}

function fetchDataForRoles(params) {
  let schema = getSchemaName(params.role);
  let url = `${SERVER_URL}${schema}?name=${params.search}`;
  return new Promise((resolve, reject) => {
    fetch(url, false).then(resolve, reject);
  });
}

export const fetchData = (params) => {
  let schema = params.schema.toLowerCase();
  let url = '';
  if (params.keys && params.keys.length) {
    url = `${SERVER_URL}${schema}?`;
    params.keys.forEach((k, i) => {
      url = url + (i > 0 ? '&': '') + k.key + '=' + k.value;
    });

  } else {
    url = `${SERVER_URL}${schema}?${params.key}=${params.search}`;

  }
  return new Promise((resolve, reject) => {
    fetch(url, false).then(resolve, reject);
  });
};

function fetchDataById(params) {
  let schema = params.schema.toLowerCase();
  let url = `${SERVER_URL}${schema}/${params.id}?$populate=true`;
  return new Promise((resolve, reject) => {
    fetch(url, true).then(resolve, reject);
  });
}


export default restMiddleWare;
