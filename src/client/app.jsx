import React, { PureComponent } from 'react';
import {createStore,compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { Route, Switch } from 'react-router';

import reducer from './reducer';
import {Router, RouterComponent} from './router';

import ListsView from './components/containers/lists.jsx';
import HomeView from './components/containers/home.jsx';
import DashboardView from './components/containers/dashboard.jsx';
import NavLinks from './components/containers/navLinks.jsx';
import NavBar from './components/containers/navBar.jsx';

import './app.sass';

import {initialState} from './constants';


const router = new Router();
const store = createStore(
  router.createStateWrapper(reducer),
  initialState,
  compose(
    applyMiddleware(
      router.createMiddlerWare()
    ),
  )
);

export default class App extends PureComponent {
  render() {
    const state = store.getState();
    return <Provider store={store}>
      <RouterComponent router={router}>
        <div>
          <NavBar brandName={state.appName}><NavLinks store={store} data={state.navLinks}/></NavBar>
          <div className="main-container container">
            <div>
              <Switch>
                <Route path="/lists" render={() => (<ListsView/>)} />
                <Route path="/dashboard" render={() => (<DashboardView/>)} />
                <Route render={() => (<HomeView/>)}/>
              </Switch>
            </div>
          </div>
        </div>
      </RouterComponent>
    </Provider>;
  }
}
