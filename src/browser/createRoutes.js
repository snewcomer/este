import Articles from './articles/Articles.react';
import Article from './articles/Article.react';
import Single from './articles/Single.react';
import MainArticle from './articles/Page.react';
import NewArticle from './articles/NewArticle.react';
import HomeMain from './home_main/Page.react';
import AuthMain from './auth_main/AuthPage.react';
import App from './app/App.react';
import Auth from './auth/AuthPage.react';
import Fields from './fields/FieldsPage.react';
import Firebase from './firebase/FirebasePage.react';
import Home from './home/HomePage.react';
import Intl from './intl/IntlPage.react';
import Me from './me/MePage.react';
import NotFound from './notfound/NotFoundPage.react';
import Profile from './me/ProfilePage.react';
import React from 'react';
import Settings from './me/SettingsPage.react';
import Todos from './todos/TodosPage.react';
import { IndexRoute, Route } from 'react-router';

export default function createRoutes(getState) {
  const requireAuth = (nextState, replace) => {
    // Note how we can read anything from the global app state safely, because
    // the app state is an immutable value.
    const loggedInUser = getState().users.viewer;
    if (!loggedInUser) {
      replace({
        pathname: '/dashboard/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  };

  return (
    <Route component={App} path="/">
      <Route component={Auth} path="login" />
      <Route component={Intl} path="intl" />
      <Route component={Fields} path="fields" />
      <Route component={Firebase} path="firebase" />
      <Route component={Me} path="me">
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
      <Route component={NotFound} path="*" />
    </Route>
  );
}
