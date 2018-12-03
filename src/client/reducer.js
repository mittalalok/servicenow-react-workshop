import { combineReducers } from 'redux';
import { listReducer } from './reducers/listReducer';
import loginReducer from './reducers/login';

const defaultReducer = (state = 0/*, action*/) => {
  return state;
};

export default combineReducers({
  appName: defaultReducer,
  navLinks: defaultReducer,
  lists: listReducer,
  login: loginReducer
});
