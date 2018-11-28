import React, { PureComponent } from 'react';
import { createStore,compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';

import reducer from './reducer';
import { Router, RouterComponent } from './router';

import ListsView from './components/container/lists';
import { listsMiddleWare } from './middlewares/listMiddleware';
import { AllLists } from './components/presentational/allLists';
import HomeView from './components/presentational/home';
import DashboardView from './components/presentational/dashboard';
import NavLinks from './components/presentational/navLinks';
import NavBar from './components/presentational/navBar';
import { formData } from './middlewares/form';
import RenderForm from './components/container/renderForm';
import './app.sass';

import { initialState } from './constants';

const router = new Router();
const middlewares = [router.createMiddlerWare(), listsMiddleWare, formData];
const store = createStore(
  router.createStateWrapper(reducer),
  initialState,
  compose(
    applyMiddleware(...middlewares),
  ),
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
                                <Route path="/candidates/:id" render={()=>(<RenderForm/>)} />
                                <Route path="/interviewers/:id" render={()=>(<RenderForm/>)} />
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
