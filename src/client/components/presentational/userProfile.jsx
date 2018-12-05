import React from 'react';
import { push } from 'connected-react-router';


export default class UserProfile extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.store.dispatch(push('/login'));
  }

  render() {
    return <span className="user-profile">
      <ul className="nav navbar-nav">
        <li>
          <a href="javascript:void(0)" onClick={this.handleClick.bind(this)}> <i className="glyphicon glyphicon-user"/></a></li>
      </ul>
    </span>;
  }
}
