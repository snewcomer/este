import { MainArticle } from '../MainArticle.react';
import Article from '../Article.react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react'; 

describe('Main Article', () => {
  it('should render mainArticle', () => {
    const mainArticle = {
        _id: 1,
        title: 'Article One',
        body: 'Article\'s are cool',
    };
    const wrapper = shallow(
      <MainArticle 
        article={mainArticle}
      />
    );
    expect(wrapper.find(Article).length).equal(1);
  });
});

