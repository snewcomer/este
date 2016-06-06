import * as actions from './actions';
import { Record } from 'immutable';
import { firebaseActions } from '../lib/redux-firebase';

const InitialState = Record({
  formDisabled: false,
  formError: null
});
const initialState = new InitialState;

export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {
    case actions.LOGIN_START:
      return state.set('formDisabled', true);
    case actions.LOGIN_ERROR:
      return state.merge({
        formDisabled: false,
        formError: action.payload
      });
    case actions.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return state.merge({
        formDisabled: false,
        formError: null
      });
  }

  return state;
}
