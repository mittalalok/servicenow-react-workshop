import { combineReducers } from 'redux';
import { listsReducer } from './components/containers/lists';

const defaultReducer = (state = 0, action) => {
	return state;
};

export default combineReducers({
  appName: defaultReducer,
  navLinks: defaultReducer,
  lists: listsReducer
})