import { EventTypes } from '../actions/login';

const initialState = {
  heading: 'Login',
  users: [],
  roles: [{ name: 'Candidate', id: 'Candidate' },
    { name: 'Interviewer', id: 'Interviewer' },
    { name: 'Manager', id: 'Manager' }],
  selectedRole: 'Candidate',
  selectedUser: null,
  requestingData: false,
  showDropdown: false,
};

export const loginReducer = (state = initialState, action) => {
  let temp = '';
  switch (action.type) {
  case EventTypes.selectRole:
    temp = state.roles.find((t) => t.id);
    return Object.assign(state, { selectedRole: temp });
  case EventTypes.requestingData:
    return Object.assign(state, { requestingData: true, showDropdown: true, selectedUser: null });
  case EventTypes.updateUserList:
    return Object.assign(state, { requestingData: false, users: action.data });
  case EventTypes.selectedUser:
    return Object.assign(state, { selectedUser: action.data, showDropdown: false });
  default:
    return state;
  }
};

export default loginReducer;
