import * as actions from './actions';
import Article from './article';
import { Map, Record, Seq } from 'immutable';

export const InitialState = Record({
  articles: Map(),
  mainArticle: undefined
});

/* Takes articles, which is a Map object, converted to Array like to iterate over and then converted back to Map */
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
* revive is meant to handle cases where initial app is loaded with INITIAL_STATE where state is just a bunch of
* empty objects
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
      const mainArticle = new Article(article);
      return state.set('mainArticle', mainArticle);
    }

    case `${actions.INCREMENT_LIKES}_SUCCESS`: {
      const article = action.payload;
      if (Array.isArray(article)) {
        // var x = state.updateIn(['articles', article._id, 'likes'], val => val);
        return;
      }
      return state.set('mainArticle', new Article(article));
    }
  }
  return state;
}
