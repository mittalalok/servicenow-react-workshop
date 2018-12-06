import { EventTypes } from '../actions/login';

const initialState = {
  heading: 'Login',
  users: [],
  roles: [{ name: 'Candidate', id: 'Candidate' },
    { name: 'Interviewer', id: 'Interviewer' },
    { name: 'Manager', id: 'Manager' }],
  selectedUser: null,
  selectedRole: null,
  requestingData: false,
  loginButtonEnabled: false,
  showDropdown: false
};
initialState.selectedRole = initialState.roles[0];

export const loginReducer = (state = initialState, action) => {
  let temp = '';
  switch (action.type) {
  case EventTypes.selectRole:
    temp = state.roles.find((t, i) => i === action.index);
    return Object.assign(state, { selectedRole: temp, loginButtonEnabled: false, selectedUser: null });
  case EventTypes.requestingData:
    return Object.assign(state, { requestingData: true, showDropdown: true, loginButtonEnabled: false, selectedUser: null });
  case EventTypes.updateUserList:
    return Object.assign(state, { requestingData: false, users: action.data });
  case EventTypes.selectedUser:
    return Object.assign(state, { selectedUser: action.data, showDropdown: false, loginButtonEnabled: true });
  default:
    return state;
  }
};

export default loginReducer;
