import { ValidationError } from '../lib/validation';

export const LOADED_ARTICLES = 'LOADED_ARTICLES';
export const LOADED_MAIN_ARTICLE = 'LOADED_MAIN_ARTICLE';
export const SUBMIT_ARTICLE = 'SUBMIT_ARTICLE';
export const SUBMIT_COMMENT = 'SUBMIT_COMMENT';
export const INCREMENT_LIKES = 'INCREMENT_LIKES';

export function loadArticles() {
  return ({ fetch }) => {
    const getPromise = async () => {
      try {
        const response = await fetch('/api/articles', {
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

export function submitNewArticle({title, body}) {
  return ({ fetch }) => {
    const getPromise = async () => {
      try {
        const response = await fetch(`/api/articles`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({title: title, body: body})
        });
        if (response.status !== 200) throw response;
        return response.json();
      } catch (error) {
        // // HTTP status to ValidationError.
        if (error.status === 401) {
          throw new ValidationError('wrongPassword', { prop: 'password' });
        }
        throw error;
      }
    };
    return {
      type: SUBMIT_ARTICLE,
      payload: getPromise()
    }
  }
}

export function incrementLikes(article_id) {
  return ({ fetch }) => {
    const getPromise = async () => {
      try {
        const response = await fetch(`/api/articles/${article_id}`, {
          method: 'PUT',
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
    return {
      type: INCREMENT_LIKES,
      payload: getPromise()
    }
  }
}

export function submitComment({body, id}) {
  return ({ fetch }) => {
    const getPromise = async () => {
      try {
        const response = await fetch(`/api/articles/${id}/add-comment`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({_id: id})
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
    return {
      type: SUBMIT_COMMENT,
      payload: getPromise()
    }
  }
}
