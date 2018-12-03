import React, { PureComponent } from 'react';
import { createStore,compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';

import reducer from './reducer';
import { Router, RouterComponent } from './router';

import ListsView from './components/container/lists';
import { listsMiddleWare } from './middlewares/listMiddleware';
import restMiddleWare from './middlewares/rest';
import { AllLists } from './components/presentational/allLists';
import HomeView from './components/presentational/home';
import DashboardView from './components/presentational/dashboard';
import NavLinks from './components/presentational/navLinks';
import NavBar from './components/presentational/navBar';
import MainView from './components/presentational/main';
import Login from './components/container/login';

import './sass/app.sass';

import { initialState } from './constants';

const router = new Router();
const store = createStore(
  router.createStateWrapper(reducer),
  initialState,
  compose(
    applyMiddleware(
      router.createMiddlerWare(),
      listsMiddleWare,
      restMiddleWare

    ),
  )
);

const ListsViewContainer = ({ match: { params } }) => (
  <ListsView params={params}/>
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
                <Route path="/lists/:listType" component={ListsViewContainer} />
                <Route path="/lists" component={AllLists} />
                <Route path="/login" component={Login} />
                <Route path="/main" component={MainView} />
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
