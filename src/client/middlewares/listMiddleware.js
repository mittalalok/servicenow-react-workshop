import { queryString } from '../utils/helper';
import { ListsAPI } from '../services/ListServices';
import { getSchemaName } from '../utils/helper';
import axios from 'axios';

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
    let schmaName = getSchemaName(window.location.hash);
    let url = `http://localhost:8017/api/${schmaName}/${action.url}`;
    axios.get(url).then(res=>{
        if(res.status === 200){
            action.payload = res.data;
            window.location.hash = `${schmaName}/${action.url}`;
            next(action);
        }
    });
}; 