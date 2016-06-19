import { Logout } from '../Logout.react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

describe('Logout', () => {
  it('renders', () => {
    const wrapper = shallow(
      <Logout />
    )
    expect(wrapper.find('.logout').length).to.equal(1);
  });
});
