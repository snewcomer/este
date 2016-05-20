import { ValidationError } from '../lib/validation';
import isomorphicFetch from 'isomorphic-fetch';

export const LOADED_ARTICLES = 'LOADED_ARTICLES';
export const LOADED_MAIN_ARTICLE = 'LOADED_MAIN_ARTICLE';

export function loadArticles() {
  /* Not using thunk like middleware because doesnt refire component */
  const getPromise = async () => {
    try {
      const response = await isomorphicFetch('/api/articles/all', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify()
      });
      if (response.status !== 200) throw response;
      return response.json();
    } catch (error) {
      // HTTP status to ValidationError.
      if (error.status === 401) {
        console.log('err fetching articles')
      }
      throw error;
    }
  };
  return {
    type: LOADED_ARTICLES,
    payload: getPromise()
  };
}

export function loadMainArticle() {
  const getPromise = async () => {
    try {
      const response = await isomorphicFetch('/api/articles/:id', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify()
      });
      if (response.status !== 200) throw response;
      return response.json();
    } catch (error) {
      // HTTP status to ValidationError.
      if (error.status === 401) {
        console.log('err fetching main article')
      }
      throw error;
    }
  };
  return {
    type: LOADED_MAIN_ARTICLE,
    payload: getPromise()
  };
}
