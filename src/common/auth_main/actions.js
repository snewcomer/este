import { ValidationError } from '../lib/validation';
import { browserHistory } from 'react-router';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export function signup() {
  return ({ fetch }) => {
    const getPromise = async () => {
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields)
        });
        return {
          type: 'SIGNUP',
          payload: getPromise()
        }
      } catch (error) {

      }
    }
  }
}

export function login({ email, password }) {
  return ({ fetch }) => {
    const getPromise = async () => {
      try {
        // Validate fields async.
        // await validate(fields)
        //   .prop('email')
        //     .required()
        //     .email()
        //   .prop('password')
        //     .required()
        //     .simplePassword()
        //   .promise;
        // // Simulate response for server-less (Firebase hosting) example.
        // if (process.env.IS_SERVERLESS) {
        //   return {
        //     email: fields.email,
        //     id: Date.now()
        //   };
        // }
        // Naive API fetch example.
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({email, password})
        });
        if (response.status !== 200) throw response;
        return response.json();
      } catch (error) {
        // HTTP status to ValidationError.
        if (error.status === 401) {
          throw new ValidationError('wrongPassword', { prop: 'password' });
        }
        throw error;
      }
    };
    return {
      type: 'LOGIN',
      payload: getPromise()
    };
  };
}

export function logout() {
  return ({ engine, firebase }) => {
    // Always redirect to home first to ensure valid view state after logout.
    if (process.env.IS_BROWSER) {
      browserHistory.replace('/');
    }
    engine.save({}); // Always reset client storage.
    firebase.unauth();
    return {
      type: LOGOUT
    };
  };
}
