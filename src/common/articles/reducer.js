import * as actions from './actions';
import Article from './article';
import { Map, Record } from 'immutable';

const InitialState = Record({
  articles: Map(),
  mainArticle: undefined
});
const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
const revive = ({ articles, article }) => {
  return initialState.merge({
    articles: Map(articles).map(article => new Article(article)),
    mainArticle: article ? new Article(article) : null
  });
}

/*
* @method articlesReducer
* How it got here::Action sent with promise.  Middleware intercepted and asked if it was thennable
* If thenable then dispatch new action when response come back.
*/
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
    case actions.LOADED_MAIN_ARTICLE: {
      const article = action.payload;
      const mainArticle = new Article(article) ;
      return state.set('mainArticle', mainArticle);
    }
  }
  return state;
}
