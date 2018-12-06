import { SERVER_URL } from '../services/config';
import axios from 'axios';

const restMiddleWare = store => next => action => {
  switch(action.type) {
  case 'api-search':
    fetchDataForRoles(action.params).then(action.callBackHandler);
    break;
  default:
    next(action);
  }
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
        let result = res.data.data;
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
      resolve(res);
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


export default restMiddleWare;
