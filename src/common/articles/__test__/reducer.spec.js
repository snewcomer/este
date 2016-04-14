import { expect } from 'chai';
import articleReducer from '../reducer';
import { loadArticles, LOADED_ARTICLES } from '../actions';
import { Map, Record } from 'immutable';

describe('Reducer::Article', () => {
  it('returns an empty array as default state', () => {
    const action = { type: 'unknown' }
    const newState = articleReducer(undefined, action);
    expect(newState.articles).to.eql(Map());
  });
  it('returns a state with many articles when state is undefined', () => {
    const action = { type: LOADED_ARTICLES, response: [{'id': '2', 'title': 'Wat is good' }] };
    const newState = articleReducer(undefined, action);
    expect(newState.articles.get('2')['id']).to.eql('2');
    expect(newState.articles.get('2')['title']).to.eql('Wat is good');
  });
});
