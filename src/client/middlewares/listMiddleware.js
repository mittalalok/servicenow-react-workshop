import { queryString } from '../utils/helper';
import { ListsAPI } from '../services/ListServices';

export const listsMiddleWare = store => next => action => {
	switch(action.type) {
		case 'fetchData':
			fetchDataMiddleWare(store, next, action);
			break;
    case 'fetch_form':
      fetchFormData(store, next, action);
      break;  
		default:
			next(action);
	}
};

export const fetchDataMiddleWare = (store, next, action) => {
	let query = queryString(action.params);
	ListsAPI.get(action.listType, query).then(res => {
		action.data = res;
		window.location.hash = `#/lists/${action.listType}?${query}`;
		next(action);
	});
};

const fetchFormData = (store, next, action) => {
  const http = (...args) => window.fetch.apply(null, args).then(res => res.json());
  let url = `http://localhost:8017/api/candidates/${action.url}`;
  http(url).then(res=>{
    action.payload = res;
    window.location.hash = `candidates/${action.url}`;
    next(action);
  });
}; 