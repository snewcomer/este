// import * as actions from '../actions.js';
import { expect } from 'chai';
import { List } from 'immutable';

describe('immutable list correct', () => {
  it('immutable data structure should equal', () => {
    function addMovie(currentState, movie) {
        return currentState.push(movie);
    }
    let state = List.of('Trainspotting', '28 Days Later');
    let nextState = addMovie(state, 'Sunshine');
    expect(nextState).to.equal(List.of(
        'Trainspotting',
        '28 Days Later',
        'Sunshine'
    ));
    // expect(state).to.equal(List.of(
    //     'Trainspotting',
    //     '28 Days Later'
    // ));
  });
});
