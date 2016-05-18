import { combineReducers } from 'redux';
import { reduxFields } from '../lib/redux-fields';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import auth from '../auth/reducer';
import config from '../config/reducer';
import device from '../device/reducer';
import intl from '../intl/reducer';
import todos from '../todos/reducer';
import ui from '../ui/reducer';
import users from '../users/reducer';
import articles from '../articles/reducer';

export default combineReducers({
  auth,
  config,
  device,
  intl,
  reduxFields,
  routing,
  todos,
  ui,
  users,
  articles,
  form
});
