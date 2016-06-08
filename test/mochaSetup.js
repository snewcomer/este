/* global global */

import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore }  from 'redux';
import reducers from '../src/common/configureReducer';
// import chaiJQeury from 'chai-jquery'
// const jsdom = require('jsdom');
import jsdom from 'jsdom';

// Setup the simplest document possible
const document = jsdom.jsdom('<!doctype html><html><body></body></html>');

// Get the window object out of the document
const window = document.defaultView;

// Set globals for mocha that make access to document and window feel
//  natural in the test environment
global.document = document;
global.window = window;

// Take all properties of the window object and also attach it to the
//  mocha global object
propagateToGlobal(window);

// From mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (const key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;

    global[key] = window[key];
  };
};

// build 'renderComponent' helper to render a given class
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
  <Provider store={createStore(reducers, state)}>
    <ComponentClass {...props} />
  </Provider>
  );
  return ReactDOM.findDOMNode(componentInstance); //get access to html produced from component.  Wrap in jquery to get access to chai jquery helpers
}

// // build helper for simulating events
// $.fn.simulate = function(eventName, value) {
//   if(value) {
//     this.val(value);
//   }
//   TestUtils.Simulate[eventName](this[0]);
// }

// // setup chai-jquery
// chaiJQeury(chai, chai.util, $);

export { renderComponent };
