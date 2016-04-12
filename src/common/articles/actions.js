import { CALL_API } from '../middleware/api';

export const LOADED_ARTICLES = 'LOADED_ARTICLES';

export function loadArticles() {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/articles',
      successType: LOADED_ARTICLES,
    }
  }
}
