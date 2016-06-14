import { ValidationError } from '../lib/validation';

export const LOADED_ARTICLES = 'LOADED_ARTICLES';
export const LOADED_MAIN_ARTICLE = 'LOADED_MAIN_ARTICLE';
export const SUBMIT_ARTICLE = 'SUBMIT_ARTICLE';
export const INCREMENT_LIKES = 'INCREMENT_LIKES';

export function loadArticles() {
  return ({ fetch }) => {
    const getPromise = async () => {
      try {
        const response = await fetch('/api/articles/all', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify()
        });
        if (response.status !== 200) throw response;
        return response.json();
      } catch (error) {
        // HTTP status to ValidationError.
        if (error.status === 401) {
          console.log('err fetching articles');
        }
        throw error;
      }
    };
    return {
      type: LOADED_ARTICLES,
      payload: getPromise()
    };
  };
}

export function loadMainArticle() {
  return ({ fetch }) => {
    const getPromise = async () => {
      try {
        const response = await fetch('/api/articles/:id', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify()
        });
        if (response.status !== 200) throw response;
        return response.json();
      } catch (error) {
        // HTTP status to ValidationError.
        if (error.status === 401) {
          console.log('err fetching main article');
        }
        throw error;
      }
    };
    return {
      type: LOADED_MAIN_ARTICLE,
      payload: getPromise()
    };
  };
}

export function submitNewArticle() {
  return {
    type: SUBMIT_ARTICLE,
    payload: 'wat'
  }
}

export function incrementLikes(article_id) {
  return ({ fetch }) => {
    const getPromise = async () => {
      try {
        const response = await fetch('/api/articles/:id', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({_id: article_id})
        });
        if (response.status !== 200) throw response;
        return response.json();
      } catch (error) {
        // // HTTP status to ValidationError.
        // if (error.status === 401) {
        //   throw new ValidationError('wrongPassword', { prop: 'password' });
        // }
        // throw error;
      }
    }
  }
  /* getPromise returns article */
  return {
    type: INCREMENT_LIKES,
    payload: getPromise()
  }
}