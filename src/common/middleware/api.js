import superAgent from 'superagent';
import Promise from 'bluebird';
import config from '../config/url';

export const CALL_API = Symbol('CALL_API');

export default store => next => action => {
  let request = action[CALL_API];
  let { method, path, successType, errorType, afterSuccess, afterError } = request;
  let url = `${config.API_BASE_URL}${path}`

  superagent[method](url)
  .end((err, res) => {
    //if(err) {
    //  if(errorType) {
    //    next({
    //      type: errorType,
    //      error, err
    //    })
    //  }

    //  //
    //  //if(_.isFunction(afterError)){
    //  //afterError({ get State });
    //  //}
    //} else {
      next({
        type: successType,
        response: res.body
      });
    // }
  });
}
