import { CALL_API } from '../../middleware/api';
import { expect } from 'chai';

import { loadArticles, LOADED_ARTICLES } from '../actions';

describe('Action::Article', () => {
  it('should create an article', () => {
    let action = loadArticles();
    expect(action[CALL_API]).to.eql({
      method: 'get',
      //url has not been modified by middleware
      path: '/articles',
      successType: LOADED_ARTICLES
    });
  });
});
