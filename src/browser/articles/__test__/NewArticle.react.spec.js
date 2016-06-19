import { NewArticle } from '../NewArticle.react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore }  from 'redux';
import reducers from '../../../../src/common/configureReducer';

describe('New Article', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      handleSubmit: () => {},
      fields: {
        title: '',
        body: ''
      }
    }
    wrapper = shallow(
      <NewArticle {...props} />
    );
  });
  it('should render newArticle', () => {
    expect(wrapper.find('.articles-new-page')).to.have.length(1);
    expect(wrapper.find('label')).to.have.length(2);
    expect(wrapper.find('.t-new-article-title')).to.have.length(1);
    expect(wrapper.find('.t-new-article-body')).to.have.length(1);
  });
  // it('should submit', () => {
  //   wrapper.simulate('submit');
  // });
});
