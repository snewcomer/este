import { Articles } from '../Articles.react';
import Article from '../Article.react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import React from 'react';

describe('Articles', () => {
  it('should render an Article item per article', () => {
    const articleList = Map({
      1: {
        id: 1,
        title: 'Article One',
        body: 'Article\'s are cool',
      },
      2: {
        id: 6,
        title: 'Article Two',
        body: 'Article\'s are awesome',
      }
    });
    const wrapper = shallow(
      <Articles 
        articles={articleList}
      />
    );
    expect(wrapper.find(Article).length).equal(articleList.size);
  });
});
