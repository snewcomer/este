import { expect } from 'chai';
import articleReducer, { InitialState } from '../reducer';
import { loadArticles, LOADED_ARTICLES, INCREMENT_LIKES, SUBMIT_COMMENT, REMOVE_COMMENT } from '../actions';
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
    const payload = {'_id': '2', 'title': 'Wat is good', 'likes': 2 };
    const action = { type: `${INCREMENT_LIKES}_SUCCESS`, payload: payload };
    /* before state */
    const payload_mod = { ...payload, likes: 1 }
    state = new InitialState({articles: Map().set(payload._id, new Article(payload_mod))});
    const newState = articleReducer(state, action);
    expect(newState.articles.get('2')['_id']).to.eql('2');
    expect(newState.articles.get('2')['likes']).to.eql(2);
  });
  it('returns a state with an article with updated comments (add)', () => {
    const payload = {'_id': '2', 'title': 'Wat is good', 'comments': [{'body': 'wat', author: 'scooter'}] };
    const action = { type: `${SUBMIT_COMMENT}_SUCCESS`, payload: payload };
    /* before state */
    const payload_mod = { ...payload, comments: [] }
    state = new InitialState({articles: Map().set(payload._id, new Article(payload_mod))});
    const newState = articleReducer(state, action);
    expect(newState.articles.get('2')['comments'].length).to.eql(1);
    expect(newState.articles.get('2')['comments'][0].body).to.eql('wat');
    expect(newState.articles.get('2')['comments'][0].author).to.eql('scooter');
  });
  it('returns a state with an article with updated comments (add)', () => {
    const payload = {'_id': '2', 'title': 'Wat is good', 'comments': [{'body': 'foo', 'author': 'scotty'}, {'body': 'wat'}] };
    const action = { type: `${SUBMIT_COMMENT}_SUCCESS`, payload: payload };
    /* before state */
    const payload_mod = { ...payload, comments: [{'body': 'foo', 'author': 'scotty'}] }
    state = new InitialState({articles: Map().set(payload._id, new Article(payload_mod))});
    const newState = articleReducer(state, action);
    expect(newState.articles.get('2')['comments'].length).to.eql(2);
    expect(newState.articles.get('2')['comments'][0].body).to.eql('foo');
    expect(newState.articles.get('2')['comments'][0].author).to.eql('scotty');
    expect(newState.articles.get('2')['comments'][1].body).to.eql('wat');
  });
  it('returns a state with a comment removed', () => {
    const payload = {'_id': '2', 'title': 'Wat is good', 'comments': [{'body': 'foo', 'author': 'scotty'}] };
    const action = { type: `${REMOVE_COMMENT}_SUCCESS`, payload: payload };
    /* before state */
    const payload_mod = { ...payload, comments: [{'body': 'foo', 'author': 'scotty'}, {'body': 'wat'}] }
    state = new InitialState({articles: Map().set(payload._id, new Article(payload_mod))});
    const newState = articleReducer(state, action);
    expect(newState.articles.get('2')['comments'].length).to.eql(1);
    expect(newState.articles.get('2')['comments'][0].body).to.eql('foo');
    expect(newState.articles.get('2')['comments'][0].author).to.eql('scotty');
  });
});
