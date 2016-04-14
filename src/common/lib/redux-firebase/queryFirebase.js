// A higher order component for Firebase queries without on / off madness.

// Example:
// Users = queryFirebase(Users, props => ({
//   // Query path to listen. For one user we can use `users/${props.userId}`.
//   // We can postpone fetching: userId && `users/${props.userId}`
//   path: 'users',
//   // firebase.com/docs/web/api/query
//   params: [
//     ['orderByChild', 'authenticatedAt'],
//     ['limitToFirst', props.limitToFirst]
//   ],
//   on: {
//     value: (snapshot) => props.onUsersList(snapshot.val())
//     // To handle custom error: value: [callback, onCustomError]
//     // To handle all events, check github.com/steida/vetoapp VetoedBy.
//   }
// }));

import * as actions from './actions';
import Component from 'react-pure-render/component';
import Firebase from 'firebase';
import React, { PropTypes } from 'react';
import invariant from 'invariant';

const onError = error => console.log(error); // eslint-disable-line no-console
const ensureArrayWithDefaultOnError = item => {
  const array = [].concat(item);
  if (array.length === 1) array.push(onError);
  return array;
};
// Use key whenever you want to force off / on event registration. It's useful
// when queried component must be rerendered, for example when app state is
// recycled on logout. Then we can just set the key to the current viewer.
const optionsToPayload = ({ path, key, params }) => ({ path, key, params });
const optionsToPayloadString = options => JSON.stringify(optionsToPayload(options));

let serverFetching = false;
let serverFetchingPromises = null;

export default function queryFirebase(Wrapped, mapPropsToOptions) {
  return class FirebaseQuery extends Component {

    static contextTypes = {
      store: PropTypes.object // Redux store.
    };

    // {eventType: fn} -> [['eventType', fn, onDefaultError]]
    // {eventType: [fn1, fn2]} -> [['eventType', fn1, fn2]]
    createArgs(eventTypes = {}) {
      // eventTypes.all is shorthand for all granular Firebase events.
      if (eventTypes.all) {
        // Make a shallow copy to prevent original eventTypes modifications.
        eventTypes = { ...eventTypes };
        const action = eventTypes.all;
        delete eventTypes.all;
        // Use value to get current state once.
        eventTypes.value = snapshot => {
          this._onAllValueCalled = true;
          const val = [];
          snapshot.forEach(childSnapshot => {
            val.push(childSnapshot.val());
          });
          action({ eventType: 'value', val });
        };
        if (!serverFetching) {
          ['child_added', 'child_changed', 'child_moved', 'child_removed']
            .forEach(eventType => {
              eventTypes[eventType] = (snapshot, prevChildKey) => {
                if (eventType === 'child_added' && !this._onAllValueCalled) {
                  return;
                }
                action({
                  eventType,
                  key: snapshot.key(),
                  prevChildKey,
                  val: snapshot.val()
                });
              };
            });
        }
      }
      return Object.keys(eventTypes).map(eventType => [
        eventType,
        ...ensureArrayWithDefaultOnError(eventTypes[eventType])
      ]);
    }

    dispatch(props, callback) {
      const options = mapPropsToOptions(props);
      // How to postpone query for not yet loaded property.
      // Example: { path: product && `products/${product.id}`, ... }
      if (!options.path) return;
      this.context.store.dispatch(({ firebase }) => {
        invariant(firebase instanceof Firebase,
          'Expected the firebase to be an instance of Firebase.');
        invariant(typeof options.path === 'string',
          'Expected the path to be a string.');
        const ref = firebase.child(options.path);
        return {
          type: callback(ref, options),
          payload: optionsToPayload(options)
        };
      });
    }

    on() {
      // This flag is for ignoring all child_added events before once value.
      this._onAllValueCalled = false;
      this.dispatch(this.props, (ref, { on, once, params = [] }) => {
        // Map declarative params to Firebase imperative API.
        params.forEach(([method, ...args]) => {
          ref = ref[method](...args);
        });
        // Map declarative on and once to Firebase imperative API.
        this.onArgs = this.createArgs(on);
        this.onArgs.forEach(arg => {
          if (serverFetching) {
            // Always use once for the server fetching.
            serverFetchingPromises.push(ref.once(...arg));
          } else if (on.all && arg[0] === 'value') {
            // Always use once for on.all value.
            ref.once(...arg);
          } else {
            ref.on(...arg);
          }
        });
        this.onceArgs = this.createArgs(once);
        this.onceArgs.forEach(arg => {
          if (serverFetching) {
            serverFetchingPromises.push(ref.once(...arg));
          } else {
            ref.once(...arg);
          }
        });
        return actions.REDUX_FIREBASE_ON_QUERY;
      });
    }

    off(props) {
      this.dispatch(props, ref => {
        // For deregistration, we have to use only eventType and callback.
        this.onArgs.forEach(arg => ref.off(arg[0], arg[1]));
        this.onceArgs.forEach(arg => ref.off(arg[0], arg[1]));
        return actions.REDUX_FIREBASE_OFF_QUERY;
      });
    }

    componentWillMount() {
      if (!serverFetching) return;
      this.on();
    }

    componentDidMount() {
      this.on();
    }

    componentDidUpdate(prevProps) {
      const prevOptions = optionsToPayloadString(mapPropsToOptions(prevProps));
      const options = optionsToPayloadString(mapPropsToOptions(this.props));
      // Detect only options change is must to avoid loops.
      if (prevOptions === options) return;
      this.off(prevProps);
      this.on();
    }

    componentWillUnmount() {
      this.off(this.props);
    }

    render() {
      return <Wrapped {...this.props} />;
    }

  };
}

// queryFirebaseServer is for server side data fetching. Example:
// await queryFirebaseServer(() => {
//   // Render app calls componentWillMount on every rendered component, so
//   // we don't have to rely on react-router routes. It's pretty fast, under
//   // 10ms generally, because view has no data yet.
//   renderApp(store, renderProps);
// });
// const html = renderPage(store, renderProps, req);
export const queryFirebaseServer = renderAppCallback => {
  serverFetching = true;
  serverFetchingPromises = [];
  try {
    renderAppCallback();
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  } finally {
    serverFetching = false;
    // Wait until all promises in an array are either rejected or fulfilled.
    // http://bluebirdjs.com/docs/api/reflect.html
    const promises = serverFetchingPromises.map(promise => promise.reflect());
    serverFetchingPromises = null;
    return Promise.all(promises);
  }
};
