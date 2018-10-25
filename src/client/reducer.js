import { combineReducers } from 'redux';
import { listReducer } from './reducers/listReducer';

const defaultReducer = (state = 0, action) => {
	return state;
};

export default combineReducers({
  appName: defaultReducer,
  navLinks: defaultReducer,
  lists: listReducer
})