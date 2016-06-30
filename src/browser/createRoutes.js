import Articles from './articles/Articles.react';
import Article from './articles/Article.react';
import Single from './articles/Single.react';
import MainArticle from './articles/Page.react';
import NewArticle from './articles/NewArticle.react';
import HomeMain from './home_main/Page.react';
import AuthMain from './auth_main/AuthPage.react';
import App from './app/App.react';
import Fields from './fields/FieldsPage.react';
import Firebase from './firebase/FirebasePage.react';
import Home from './home/HomePage.react';
import Intl from './intl/IntlPage.react';
import Login from './auth/LoginPage.react';
import Me from './me/MePage.react';
import NotFound from './notfound/NotFoundPage.react';
import Offline from './offline/OfflinePage.react';
import Profile from './me/ProfilePage.react';
import React from 'react';
import Settings from './me/SettingsPage.react';
import Todos from './todos/TodosPage.react';
import { IndexRoute, Route } from 'react-router';

export default function createRoutes(getState) {
  const requireAuth = (nextState, replace) => {
    // Note how we can read anything from the global app state safely, because
    // the app state is an immutable value.
    if (!getState().auth.isAuthenticated) {
      replace({
        pathname: '/dashboard/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  };

  return (
    <Route component={App} path="/">
      <IndexRoute component={Home} />
      <Route component={Login} path="login" />
      <Route component={Intl} path="intl" />
      <Route component={Fields} path="fields" />
      <Route component={Firebase} path="firebase" />
      <Route component={Me} onEnter={requireAuth} path="me">
        <Route component={Profile} path="profile" />
        <Route component={Settings} path="settings" />
      </Route>
      <Route component={Todos} path="todos" />
      <Route component={HomeMain} path="dashboard">
        <IndexRoute component={MainArticle} />
        <Route component={Articles} path="articles">
        </Route>
        <Route component={Single} path="article/:id" />
        <Route component={NewArticle} path="articles/new" />
        <Route component={AuthMain} path="login" />
      </Route>
      <Route component={Offline} path="offline" />
      <Route component={NotFound} path="*" />
    </Route>
  );
}
