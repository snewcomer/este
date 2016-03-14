import 'babel-polyfill';
import Bluebird from 'bluebird';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../common/configureStore';
import createRoutes from './createRoutes';
import cs from 'react-intl/locale-data/cs';
import en from 'react-intl/locale-data/en';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { addLocaleData } from 'react-intl';
import { browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';

// github.com/yahoo/react-intl/wiki/Upgrade-Guide#add-call-to-addlocaledata-in-browser
addLocaleData(cs);
addLocaleData(en);

// http://bluebirdjs.com/docs/why-bluebird.html
window.Promise = Bluebird;

const store = configureStore({
  initialState: window.__INITIAL_STATE__,
  platformMiddleware: [routerMiddleware(browserHistory)]
});
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store.getState);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app')
);
