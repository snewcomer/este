import * as actions from '../actions.js';
import { expect } from 'chai';

import { loadArticles, LOADED_ARTICLES, INCREMENT_LIKES } from '../actions';

describe('Action::Article', () => {
  it('should load article', () => {
    const deps = {
      fetch: () => {}
    };
    const action = actions.loadArticles()(deps);
    const { type, payload } = action;
    expect(type).equal(actions.LOADED_ARTICLES);
    // expect(payload.createdAt).equal('now');
    // expect(payload.id).equal('uid');
    // expect(payload.title).equal('Hello');
  });
  it('should load main article', () => {
    const deps = {
      fetch: () => {}
    };
    const action = actions.loadMainArticle()(deps);
    const { type, payload } = action;
    expect(type).equal(actions.LOADED_MAIN_ARTICLE);
  });
  it('should increment likes', () => {
    const deps = {
      fetch: () => {}
    };
    const action = actions.incrementLikes()(deps);
    const { type, payload } = action;
    expect(type).equal(actions.INCREMENT_LIKES);
  });
});
