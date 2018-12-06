import axios from 'axios';
import { SERVER_URL } from '../constants';

export const formData = store => next => action => {
    switch (action.type) {
    case 'save_form':
        saveFormData(store, next, action);
        break;
    default:
        next(action);
    }
};

const saveFormData = (store, next, action)=> {
    let parts = window.location.hash.split('/');

    let url = `${SERVER_URL}${parts[1]}/${parts[2]}`;
    axios.put(url, action.payload).then((res)=>{
        if(res.status === 200){
            action.status = 200;
            next(action);
        }
    }).catch(()=>{
        action.status = 500;
        next(action);
    });
};
