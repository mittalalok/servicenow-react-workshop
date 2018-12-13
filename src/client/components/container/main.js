import { connect } from 'react-redux';
import Main from '../presentational/main';

const stateToProps = (state) => {
  let login = state.login;
  return {
    currentUser: login.selectedUser,
    currentRole: login.selectedRole
  };
};

const dispatchToProps = (dispatch, state) => {
  return {
  };
};

const ConnectedMainView = connect(
  stateToProps,
  dispatchToProps)(Main);

export default ConnectedMainView;
