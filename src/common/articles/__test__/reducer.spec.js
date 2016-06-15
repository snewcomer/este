import { expect } from 'chai';
import articleReducer, { InitialState } from '../reducer';
import { loadArticles, LOADED_ARTICLES, INCREMENT_LIKES } from '../actions';
import { Map, Record } from 'immutable';
import Article from '../article';

describe('Reducer::Article', () => {
  it('returns an empty array as default state', () => {
    const action = { type: 'unknown' }
    const newState = articleReducer(undefined, action);
    expect(newState.articles).to.eql(Map());
  });
  it('returns a state with many articles when state is undefined', () => {
    const action = { type: LOADED_ARTICLES+'_SUCCESS', payload: [{'_id': '2', 'title': 'Wat is good' }] };
    // const state = new Record({articles: Map()})
    const newState = articleReducer(undefined, action);
    expect(newState.articles.get('2')['_id']).to.eql('2');
    expect(newState.articles.get('2')['title']).to.eql('Wat is good');
  });
  it('returns a state with an article with incremented likes', () => {
    const payload = {"_id": "2", "title": "Wat is good", "likes": 1 };
    const action = { type: INCREMENT_LIKES, payload: payload };
    const payload_mod = {...payload, likes: 2}
    state = new InitialState({articles: Map().set(payload._id, new Article(payload_mod))});
    const newState = articleReducer(state, action);
    expect(newState.articles.get('2')['_id']).to.eql('2');
    expect(newState.articles.get('2')['likes']).to.eql(2);
  });
});
