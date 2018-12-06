import { initState as listsInitState } from './components/container/lists';

const initialState = {
  appName: 'Interview Scheduler',
  navLinks: [{ name: 'Home', link: '/' }, { name: 'Lists', link: '/lists' }, { name: 'Dashboard', link: '/dashboard' }],
  lists: listsInitState
};
const SERVER_URL = 'http://localhost:8017/api/';

export {
  initialState,
  SERVER_URL
};
