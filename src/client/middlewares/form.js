import axios from 'axios';

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
  let url = `http://localhost:8017/api/${parts[1]}/${parts[2]}`;
  axios.put(url, action.payload).then((res)=>{
    if(res.status === 200)
      next(action);
  });
};

