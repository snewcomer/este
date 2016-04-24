import { ValidationError } from '../lib/validation';
import isomorphicFetch from 'isomorphic-fetch';

export const LOADED_ARTICLES = 'LOADED_ARTICLES';

export function loadArticles() {
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
