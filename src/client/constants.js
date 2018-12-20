import { initState as listsInitState } from './components/container/lists';
import Store from './services/localStore';
const store = new Store();

const storeKeys = {
  user: 'jsws_user',
  role: 'jsws_role'
};

const storeUser = store.get(storeKeys.user);
const storeRole = store.get(storeKeys.role);

const loginInitialState = {
  heading: 'Login',
  users: [],
  roles: [{ name: 'Candidate', id: 'Candidate' },
    { name: 'Interviewer', id: 'Interviewer' },
    { name: 'Manager', id: 'Manager' }],
  selectedUser: storeUser ? JSON.parse(storeUser) : null,
  selectedRole: storeRole ? JSON.parse(storeRole) : null,
  loginButtonEnabled: false,
  requestingData: false
};
loginInitialState.selectedRole = loginInitialState.selectedRole || loginInitialState.roles[0];

const initialState = {
  appName: 'Interview Scheduler',
  navLinks: [{ name: 'Home', link: '/' }, { name: 'Lists', link: '/lists' }, { name: 'Dashboard', link: '/dashboard' }],
  lists: listsInitState,
  login: loginInitialState
};
const SERVER_URL = 'http://localhost:8017/api/';

export {
  initialState,
  storeKeys,
  SERVER_URL
};
