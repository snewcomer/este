import * as actions from './actions';
import Article from './article';
import { Map, Record } from 'immutable';

const InitialState = Record({
  articles: Map()
});
const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
const revive = ({ articles }) => {
  return initialState.merge({articles: Map(articles).map(article => new Article(article)) });
}

export default function articlesReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) {
    return revive(state);
  }
  switch (action.type) {
    case actions.LOADED_ARTICLES: {
      const articles = action.payload;
      const articleList = articles.reduce((articles, json) => {
        return articles.set(json._id, new Article(json)) ;
      }, Map());
      var newState = state.update('articles', (articles) => {
        return articles.merge(articleList)
      });
      return newState;
    }
  }
  return state;
}
