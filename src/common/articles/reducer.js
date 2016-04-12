import * as actions from './actions';
import Article from './article';
import { Map, Record } from 'immutable';

const InitialState = Record({
  articles: Map()
});
const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
const revive = ({ articles }) => initialState.merge({
  articles: Map(articles).articles(article => new Article(article))
});

export default function articlesReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return revive(state);

  switch (action.type) {
    case actions.LOADED_ARTICLES: {
      const articles = action.response.reduce((articles, json) => {
        return articles.set(json.id, new Article(json)) ;
      }, Map());
      return state.update('articles', cb => articles.merge(cb));
    }
  }
  return state;
}

