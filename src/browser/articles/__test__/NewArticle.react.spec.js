import { NewArticle } from '../NewArticle.react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore }  from 'redux';
import reducers from '../../../../src/common/configureReducer';

describe('New Article', () => {
  it('should render newArticle', () => {
    const props = {
      handleSubmit: () => {},
      fields: {
        title: '',
        body: ''
      }
    }
    const wrapper = mount(
      <NewArticle {...props} />
    );
    expect(wrapper.find('.articles-new-page')).to.have.length(1);
  });
});
