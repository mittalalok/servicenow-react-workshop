import { initState as listsInitState } from './components/containers/lists';

const initialState = {
  appName: 'Interview Scheduler',
  navLinks: [{name: 'Home', link: '/'}, {name: 'Lists', link: '/lists'}, {name: 'Dashboard', link: '/dashboard'}],
  lists: listsInitState
};


export {
  initialState
};
