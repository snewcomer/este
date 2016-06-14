import * as actions from './actions';
import Article from './article';
import { Map, Record, Seq } from 'immutable';

const InitialState = Record({
  articles: Map(),
  mainArticle: undefined
});

const reviveArticles = articles => Seq(articles).map(json => new Article(json)).toMap();

// Note how JSON from server is revived to immutable record.
const revive = ({ articles, article }) => {
  return new InitialState({
    articles: reviveArticles(articles),
    mainArticle: article ? new Article(article) : null
  });
}

/*
* @method articlesReducer
* Guessing: revive is meant to handle cases where state gets screwed up or intermediate actions not providing any state
* new InitialState is of type Record (enfore specific set of allowed string keys w/ default values)
*/
export default function articlesReducer(state = new InitialState, action) {
  if (!(state instanceof InitialState)) return revive(state);
  switch (action.type) {
    case `${actions.LOADED_ARTICLES}_SUCCESS`: {
      const articles = action.payload;
      const articleList = articles.reduce((articles, json) => {
        return articles.set(json._id, new Article(json)) ;
      }, Map());
      var newState = state.update('articles', (articles) => {
        return articles.merge(articleList)
      });
      return newState;
    }
    case `${actions.LOADED_MAIN_ARTICLE}_SUCCESS`: {
      const article = action.payload;
      const mainArticle = new Article(article) ;
      return state.set('mainArticle', mainArticle);
    }
    case `${actions.INCREMENT_LIKES}`: {
      const article = action.payload;
    }
  }
  return state;
}
