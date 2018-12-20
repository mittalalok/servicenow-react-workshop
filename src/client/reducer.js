import { combineReducers } from 'redux';
import { listReducer } from './reducers/listReducer';
import loginReducer from './reducers/login';
import manager from './reducers/manager';
import { form }  from './reducers/form';

const defaultReducer = (state = 0/*, action*/) => {
  return state;
};

export default combineReducers({
  appName: defaultReducer,
  navLinks: defaultReducer,
  lists: listReducer,
  login: loginReducer,
  form: form,
  manager
});
