import { Comments } from '../Comments.react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import React from 'react';

describe('Comments', () => {
  let wrapper;
  beforeEach(() => {
    const comments = [{"body": "wat", "user": "scooter"}]
    wrapper = shallow(
      <Comments articleComments={comments} />
    )
  })
  it('should render a comment for every comment in article', () => {
    expect(wrapper.find('.comments').length).to.equal(1);
  });
});
