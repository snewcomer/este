export default function({ dispatch }) {
  return next => action => {
    //If not a promise
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // Make sure the action's promise resolves
    action.payload
      .then(function(response) {
        // create a new action with the old type, but replace the promise with the reponse data
        // dispatch action so goes through the middleware stack again
        const newAction = { ...action, payload: response };
        dispatch(newAction);
      });
  }
}
