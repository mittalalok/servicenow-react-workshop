import { connect } from 'react-redux';
import Login from '../presentational/login';
import { selectRole, requestingData, requestData, updateUserList, selectedUser } from '../../actions/login';
import { push } from 'connected-react-router';


const stateToProps = (state) => {
  let login = state.login;
  return {
    heading: login.heading,
    roles: login.roles,
    selectedRole: login.selectedRole,
    requestingData: login.requestingData,
    users: login.users,
    showDropdown: login.showDropdown,
    selectedUser: login.selectedUser
  };
};

const dispatchToProps = (dispatch) => {
  return {
    loginSuccess: () => {
      dispatch(push('/main'));
    },
    changeRole: (index) => {
      dispatch(selectRole(index));
    },
    searchUser: (text) => {
      dispatch(requestingData(text));
      dispatch(requestData({ text }, (data)=>{
        dispatch(updateUserList(data));
      }));
    },
    onUserSelect: (entity) => {
      dispatch(selectedUser(entity));
    }
  };
};

const ConnectedLoginView = connect(
  stateToProps,
  dispatchToProps)(Login);

export default ConnectedLoginView;
