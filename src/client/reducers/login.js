import { EventTypes } from '../actions/login';
import { initialState } from '../constants';


export const loginReducer = (state = initialState.login, action) => {
  let temp = '';
  switch (action.type) {
  case EventTypes.selectRole:
    temp = state.roles.find((t, i) => i === action.index);
    return Object.assign(state, { selectedRole: temp, loginButtonEnabled: false, selectedUser: null });
  case EventTypes.requestingData:
    return Object.assign(state, { requestingData: true, showDropdown: true, loginButtonEnabled: false, selectedUser: null, currentHoveredUserIndex: 0 });
  case EventTypes.updateUserList:
    return Object.assign(state, { requestingData: false, users: action.data });
  case EventTypes.selectedUser:
    if(action.data)
      return Object.assign(state, { selectedUser: action.data, showDropdown: false, loginButtonEnabled: true });
    else
      return Object.assign(state, { selectedUser: null, showDropdown: false, loginButtonEnabled: false });
  case EventTypes.hoveredUser:
    return Object.assign(state, { currentHoveredUserIndex: action.index });
  default:
    return state;
  }
};

export default loginReducer;
