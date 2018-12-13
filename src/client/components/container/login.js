import { connect } from 'react-redux';
import Login from '../presentational/login';
import { selectRole, requestingData, requestData, updateUserList, selectedUser, hoveredUser } from '../../actions/login';
import { push } from 'connected-react-router';


const stateToProps = (state) => {
  let login = state.login;
  return {
    heading: login.heading,
    roles: login.roles,
    requestingData: login.requestingData,
    users: login.users,
    showDropdown: login.showDropdown,
    selectedRole: login.selectedRole,
    selectedUser: login.selectedUser,
    loginButtonEnabled: login.loginButtonEnabled,
    currentHoveredUserIndex: login.currentHoveredUserIndex
  };
};

const dispatchToProps = (dispatch, state) => {
  return {
    loginSuccess: () => {
      dispatch(push('/main'));
    },
    changeRole: (index) => {
      dispatch(selectRole(index));
    },
    searchUser: (params) => {
      dispatch(requestingData());
      dispatch(requestData(params, (data)=>{
        dispatch(updateUserList(data));
      }));
    },
    onUserSelect: (entity) => {
      dispatch(selectedUser(entity));
    },
    handleDropDownHover: (ind) => {
      if (typeof(ind) !== 'undefined') {
        dispatch(hoveredUser(ind));
      }
    }
  };
};

const ConnectedLoginView = connect(
  stateToProps,
  dispatchToProps)(Login);

export default ConnectedLoginView;
