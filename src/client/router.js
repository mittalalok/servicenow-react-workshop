import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { createHashHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter  } from 'connected-react-router';

export class Router {
  constructor() {
    this.history = createHashHistory();
  }
  createStateWrapper(reducer) {
    return connectRouter(this.history)(reducer);
  }
  createMiddlerWare() {
    return routerMiddleware(this.history);
  }
}


export class RouterComponent extends PureComponent {
  render () {
    return <ConnectedRouter history={this.props.router.history}>
      {this.props.children}
    </ConnectedRouter>;
  }
}

RouterComponent.propTypes = {
  router: PropTypes.object,
  children: PropTypes.object
};
