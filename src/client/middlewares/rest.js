import { SERVER_URL } from '../services/config';
import { ListsAPI } from '../services/ListServices';

const restMiddleWare = store => next => action => {
  switch(action.type) {
  case 'api-search':
    fetchData(action.params).then(action.callBackHandler);
    break;
  default:
    next(action);
  }
};

function fetchData(params) {
  return new Promise((resolve) => {
    setTimeout(()=>{
      resolve([
        { name: 'can', id: '01' },
        { name: 'man', id: '02' },
        { name: 'fan', id: '03' },
        { name: 'ran', id: '04' },
        { name: 'van', id: '05' },
        { name: 'ran', id: '05' },
        { name: 'can', id: '05' },
        { name: 'san', id: '05' },
      ]);
    }, 1000);
  });
}


export default restMiddleWare;
