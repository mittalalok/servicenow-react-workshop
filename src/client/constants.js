import { initState as listsInitState } from './components/container/lists';
const loginInitialState = {
  heading: 'Login',
  users: [],
  roles: [{ name: 'Candidate', id: 'Candidate' },
    { name: 'Interviewer', id: 'Interviewer' },
    { name: 'Manager', id: 'Manager' }],
  selectedUser: null,
  selectedRole: null,
  currentHoveredUserIndex: 0,
  requestingData: false,
  loginButtonEnabled: false,
  showDropdown: false
};
loginInitialState.selectedRole = loginInitialState.roles[0];

const initialState = {
  appName: 'Interview Scheduler',
  navLinks: [{ name: 'Home', link: '/' }, { name: 'Lists', link: '/lists' }, { name: 'Dashboard', link: '/dashboard' }],
  lists: listsInitState,
  login: loginInitialState
};
const SERVER_URL = 'http://localhost:8017/api/';

export {
  initialState,
  SERVER_URL
};
