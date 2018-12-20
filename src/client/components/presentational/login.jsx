import React from 'react';
import Modal from './modal/index';
import SearchBox from './searchDropDown/index';
import PropTypes from 'prop-types';

const NamedObjectType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
});



export default class Login extends React.PureComponent {
  static propTypes = {
    heading: PropTypes.string.isRequired,
    selectedUser: NamedObjectType,
    selectedRole: NamedObjectType,
    roles: PropTypes.arrayOf(NamedObjectType),
    users: PropTypes.arrayOf(NamedObjectType),
    changeRole: PropTypes.func,
    searchUser: PropTypes.func,
    onUserSelect: PropTypes.func,
    loginSuccess: PropTypes.func.isRequired,
    loginButtonEnabled: PropTypes.bool.isRequired,
    requestingData: PropTypes.bool.isRequired,
  };

  onChangeRole(e) {
    this.props.changeRole(e.target.selectedIndex);
  }

  onUserChange(val) {
    this.props.searchUser({ role: this.props.selectedRole, search: val });
  }

  onClick(e) {
    e.preventDefault();
    this.props.loginSuccess();
  }

  render() {
    const { heading, roles, users } = this.props;
    return (
      <Modal isOpen={true}>
        <h1> {heading} </h1>
        <br/>
        <div className='component-login'>
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="inputRole" className="col-sm-2 control-label">Role</label>
              <div className="col-sm-10">
                <select id="inputRole" className="form-control" onChange={this.onChangeRole.bind(this)} value={this.props.selectedRole ? this.props.selectedRole.id : ''}>
                  { roles.map((r) => <option key={r.id} value={r.id}>{ r.name }</option>) }
                </select>
              </div>
            </div>
            <div className="form-group has-feedback">
              <label htmlFor="inputUser" className="col-sm-2 control-label">User</label>
              <div className="col-sm-10">
                <SearchBox
                  onSearch={this.onUserChange.bind(this)}
                  onSelect={this.props.onUserSelect.bind(this)}
                  isSearching={this.props.requestingData}
                  data={users}/>
              </div>
            </div>
            <br/>
            <div className="form-group">
              <div className="col-sm-offset-10 col-sm-2">
                <button disabled={this.props.loginButtonEnabled ? '' : 'disabled'} type="submit" className="btn btn-primary" onClick={this.onClick.bind(this)}>Login</button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}
