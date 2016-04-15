import { ValidationError } from '../lib/validation';

export const LOADED_ARTICLES = 'LOADED_ARTICLES';

export function loadArticles() {
  return ({ fetch, validate }) => {
    console.log('FUCCCC')
    const getPromise = async () => {
      try {
        const response = await fetch('/api/articles/all', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields)
        });
        if (response.status !== 200) throw response;
        return response.json();
      } catch (error) {
        // HTTP status to ValidationError.
        if (error.status === 401) {
          throw new ValidationError('wrongPassword', { prop: 'password' });
        }
        throw error;
      }
    };

    return {
      type: LOADED_ARTICLES,
      response: getPromise()
    };
  };
}
