import { Login } from '../Login.react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { locationShape } from 'react-router';

describe('Login', () => {
  const loginDefaultProps = {
    auth: {},
    // fields: {email: {value:'snewcomer@wat.com'}, password: {value:'wat'}},
    // int: intlShape,
    // location: locationShape,
    getState: () => {},
    login: () => {}
  };
  it('should render Login', () => {
    const wrapper = shallow(
      <Login { ...loginDefaultProps }/>
    );
    expect(wrapper.find('.login')).to.exist;
  });
});
